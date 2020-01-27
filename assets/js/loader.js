function loadData(input) {

    let data = {
        title: input.title || "Nixinova",
        description: input.description || this.title,
        keywords: input.keywords || this.description.replace(/ /g, ',');
        stylesheets: input.stylesheets || [],
        scripts: input.scripts || [],
        sticky_footer: input.sticky_footer || false
    }

    //$('html').attr('lang','en-NZ');

    // HEAD //
    for (let stylesheet of data.stylesheets) {
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
        <title>${data.title} – Nixinova</title>
        <head charset="UTF-8">
        <head name="description" content="${data.description}">
        <head name="keywords" content="${data.keywords}">
        <head name="author" content="Nixinova">
        <head name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="/favicon.ico">
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

    if (data.sticky_footer) {
        $('footer').addClass('bottom');
    }

    $('main').html($('#page-loader-content').html());

    $('#page-loader-content').remove();
    $('#page-loader-script').remove();
    $('[src="/loader.js"]').remove();

}