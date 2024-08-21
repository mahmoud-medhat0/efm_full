import "../css/app.css";
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Toaster } from "react-hot-toast";
import NProgress from 'nprogress'
import { router } from '@inertiajs/react'

createInertiaApp({
    // Resolving all React components from resources/js/Pages folder with .jsx and .tsx extensions
    resolve: (name) => resolvePageComponent(`./Pages/${name}`, import.meta.glob([
        './Pages/**/*.jsx',
        './Pages/**/*.tsx',
    ])),
    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <App {...props} />
                <Toaster />
            </>
        );
    },
    progress: {

        delay: 2000,

        // The color of the progress bar...

        color: '#29d',
        // Whether to include the default NProgress styles...
        includeCSS: true,

        // Whether the NProgress spinner will be shown...

        showSpinner: true,
    }
});
router.on('start', () => NProgress.start())
router.on('finish', (event) => {
    if (event.detail.visit.completed) {
      NProgress.done()
    } else if (event.detail.visit.interrupted) {
      NProgress.set(0)
    } else if (event.detail.visit.cancelled) {
      NProgress.done()
      NProgress.remove()
    }
  })
  router.on('progress', (event) => {
    if (event.detail.progress.percentage) {
      NProgress.set((event.detail.progress.percentage / 100) * 0.9)
    }
  })
    