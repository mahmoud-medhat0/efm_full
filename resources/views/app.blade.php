<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="{{asset('assets/logo.png')}}" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
    @viteReactRefresh
    @vite('resources/css/app.css')
    @vite('resources/js/app.jsx')
    <script src="https://support.eng-money.com/supportboard/js/min/jquery.min.js"></script>
    <script id="sbinit" src="https://support.eng-money.com/supportboard/js/main.js"></script>
    @inertiaHead
    @routes('client')
  </head>
  <body>
    @inertia
  </body>
</html>