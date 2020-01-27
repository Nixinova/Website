function loadData(data) {

    //$('html').attr('lang','en-NZ');

    // HEAD //
    $('head').append(`
        <title>${data.head.title}</title>
        <head charset="UTF-8">
        <head name="description" content="${data.head.description}">
        <head name="author" content="Nixinova">
        <head name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="/favicon.ico">
    `);

    for (var stylesheet of data.head.stylesheets) {
        $('head').append(`\n\t<link rel="stylesheet" href="/assets/css/${stylesheet}">`);
    }

    for (var script of data.head.stylesheets) {
        if (script.startsWith('./')) {
            $('head').append(`\n\t<script src="${script}">`);
        } else {
            $('head').append(`\n\t<script src="/assets/js/${script}">`);
        }
    }

    $('head').append($('style.page-styles'));
    $('style.page-styles').remove();

    $('head').append($('script.page-script'));
    $('script.page-script').remove();

    // BODY //
    $('body').append(`
        <header>
            <nav></nav>
        </header>

        <main>
        </main>

        <footer>
        </footer>
    `);

    $('nav').load('/assets/imports/navigation');
    $('footer').load('/assets/imports/footer');

    $('main').html($('#page-loader-content').html());

    $('#page-loader-script').remove();

}