const mix = require('laravel-mix');

mix.js('resources/js/index.js', 'public/js')
    .js('resources/js/App.jsx', 'public/js')
    .js('resources/js/components/context/context.jsx', 'public/js')
    .js('resources/js/components/context/SessionProvider.jsx', 'public/js')
    .js('resources/js/components/Login/Login.jsx', 'public/js')
    .js('resources/js/components/main/Main.jsx', 'public/js')
    .js('resources/js/components/events/Events.jsx', 'public/js')
    .js('resources/js/components/events/Table.jsx', 'public/js')
    .js('resources/js/components/events/EventRow.jsx', 'public/js')
    .js('resources/js/components/modal/Modal.jsx', 'public/js')
    .js('resources/js/components/scan/Scan.jsx', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css');
