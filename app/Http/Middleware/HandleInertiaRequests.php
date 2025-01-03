<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        app()->setLocale(session()->get('locale','en'));
        $trans = file_get_contents(resource_path('lang/' . app()->getLocale() . '.json'));
        $trans = json_decode($trans, true);
        return array_merge(parent::share($request), [
            'authed' => fn () => Auth()->user() ? true : false,
            'auth' => [
                'client' => Auth()->user(),
            ],
            'current_url' => fn () => $request->fullUrl(),
            'app_url' => fn () => env('APP_URL'),
            'app_debug' => fn () => env('APP_DEBUG'),
            'lang' => fn () => session()->get('locale', 'en'),
            'trans' => fn () => $trans,
        ]);
    }
}
