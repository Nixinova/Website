function loadData(input) {

    let data = {
        title: input.title,
        description: input.description || input.title,
        keywords: input.keywords || input.description.replace(/ /g, ','),
        stylesheets: input.stylesheets || [],
        scripts: input.scripts || [],
        og: {
            title: input.og.title || null,
            description: input.og.description || null,
            image: input.og.image || 'nixinova.png'
        }
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

    let og_title = data.og.title ? `<meta property="og:title" content="${data.og.title}">` : '';
    let og_desc = data.og.description ? `\n<meta property="og:description" content="${data.og.description}">` : '';
    let og_img = data.og.image ? `\n<meta property="og:image" content="https://nixinova.com/assets/images/${data.og.image}">` : '';
    
    $('head').prepend(`
        <title>${data.title === 'Nixinova' ? 'Nixinova' : data.title + ' – Nixinova'}</title>
        <meta charset="UTF-8">
        <meta name="description" content="${data.description}">
        <meta name="keywords" content="${data.keywords}">
        <meta name="author" content="Nixinova">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${og_title}${og_desc}${og_img}
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