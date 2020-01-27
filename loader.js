function loadData(data) {

    $('html').attr('lang','en-NZ');

    // HEAD //
    $('html').append(`\n<head>
        <title>${data.head.title}</title>
        <head charset="UTF-8">
        <head name="description" content="${data.head.description}">
        <head name="author" content="Nixinova">
        <head name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="/favicon.ico">
    `);

    for (var stylesheet of data.head.stylesheets) {
        $('html').append(`\n\t<link rel="stylesheet" href="/assets/css/${stylesheet}">`);
    }

    for (var script of data.head.stylesheets) {
        if (script.startsWith('./')) {
            $('html').append(`\n\t<script src="${script}">`);
        } else {
            $('html').append(`\n\t<script src="/assets/js/${script}">`);
        }
    }

    $('html').append($('style'));
    $('style').remove();

    $('html').append($('script:not(#page-loader-script)'));
    $('script:not(#page-loader-script)').remove();

    $('html').append(`\n</head>`);

    // BODY //
    $('html').append(`\n<body>
        <header>
            <nav></nav>
        </header>

        <main>
        </main>

        <footer>
        </footer>
    </body>`);

    $('nav').load('/assets/imports/navigation');
    $('footer').load('/assets/imports/footer');

    $('main').html($('#page-loader-content'));

    $('#page-loader-script').remove();

}