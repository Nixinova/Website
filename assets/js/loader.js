function loadData(input) {

    let data = {
        title: input.title ? input.title + ' – Nixinova' : "Nixinova",
        description: input.description || input.title,
        keywords: input.keywords || input.description.replace(/ /g, ','),
        stylesheets: input.stylesheets || [],
        scripts: input.scripts || []
    }

    //$('html').attr('lang','en-NZ');

    // HEAD //
    $('[href="/assets/css/main.css"]').remove();
    for (let stylesheet of data.stylesheets) {
        if (stylesheet === 'main.css') continue; // added in post-processing
        $('head').prepend(`\n\t<link rel="stylesheet" href="/assets/css/${stylesheet}">`);
    }

    for (let script of data.scripts) {
        if (script.startsWith('./')) {
            $('head').prepend(`\n\t<script src="${script}">`);
        } else {
            $('head').prepend(`\n\t<script src="/assets/js/${script}">`);
        }
    }
    
    $('head').prepend(`
        <title>${data.title}</title>
        <head charset="UTF-8">
        <meta name="description" content="${data.description}">
        <meta name="keywords" content="${data.keywords}">
        <meta name="author" content="Nixinova">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="/favicon.ico">
        <link rel="stylesheet" href="/assets/css/main.css">
    `);

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

    $('#page-loader-content').remove();
    $('#page-loader-script').remove();
    $('[src="/loader.js"]').remove();

}