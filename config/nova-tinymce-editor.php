<?php

return [
    'cloudChannel' => '6', // 5 or 6

    /**
     * Get your API key at https://www.tiny.cloud and put it here or in your .env file
     */
    'apiKey' => env('TINYMCE_API_KEY', ''),

    /**
     * The default skin to use.
     */
    'skin' => 'oxide-dark',

    /**
     * The default options to send to the editor.
     * See https://www.tiny.cloud/docs/configure/ for all available options (check for 5 or 6 version).
     */
    'init' => [
        'menubar' => false,
        'autoresize_bottom_margin' => 40,
        'branding' => false,
        'image_caption' => true,
        'paste_as_text' => true,
        'autosave_interval' => '20s',
        'autosave_retention' => '30m',
        'browser_spellcheck' => true,
        'contextmenu' => false,
        // 'images_upload_url' => '/nova-vendor/murdercode/tinymce/upload', // Uncomment this line if you want to enable images upload
    ],
    'plugins' => [
        'advlist',
        'autolink',
        'lists',
        'link',
        'image',
        'charmap',
        'print',
        'preview',
        'anchor',
        'pagebreak',
        'advlist',
        'anchor',
        'autolink',
        'autosave',
        'fullscreen',
        'lists',
        'link',
        'image',
        'media',
        'table',
        'code',
        'wordcount',
        'autoresize',
        'textcolor',
        'colorpicker',
    ],
    'fontsize_formats' => '8pt 10pt 12pt 14pt 18pt 24pt 36pt',

    'toolbar' => [
        'undo redo restoredraft | h2 h3 h4 |
                 bold italic underline strikethrough blockquote removeformat |
                 align bullist numlist outdent indent | image link anchor table | code fullscreen spoiler | forecolor backcolor | alignleft aligncenter alignright alignjustify | fontsize ',
    ],

    /**
     * Extra configurations for the editor.
     */
    'extra' => [
        'upload_images' => [
            'enabled' => true, // Set true for enable images local upload
            'folder' => 'images',
            'maxSize' => 2048, // KB,
            'disk' => 'public',
        ],
    ],
];
