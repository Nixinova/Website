var loadCount = 0;
function loadData(input) {

    if (loadCount > 0) return;

    let data = {
        title: input.title,
        description: input.description || input.title,
        keywords: input.keywords || input.description.replace(/ /g, ','),
        stylesheets: input.stylesheets || [],
        scripts: input.scripts || [],
        og_title: input.og_title || null,
        og_description: input.og_description || null,
        og_image: input.og_image || null,
        footer_content: input.footer_content || ''
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
            $('head').prepend(`\n\t<script src="${script.substr(2)}">`);
        } else {
            $('head').prepend(`\n\t<script src="/assets/js/${script}">`);
        }
    }

    let og_title = data.og_title ? `<meta property="og:title" content="${data.og_title}">` : '';
    let og_desc = data.og_description ? `\n<meta property="og:description" content="${data.og_description}">` : '';
    let og_image = data.og_description ? `\n<meta property="og:image" content="https://nixinova.com/assets/images/${data.og_image}">` : '';
    
    $('head').prepend(`
        <meta charset="UTF-8">
        <title>${data.title === '' ? 'Nixinova' : data.title + ' – Nixinova'}</title>
        <meta name="description" content="${data.description}">
        <meta name="keywords" content="${data.keywords}">
        <meta name="author" content="Nixinova">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${og_title}${og_desc}${og_image}
        <link rel="icon" href="/favicon.ico">
        <link rel="stylesheet" href="/assets/css/main.css">
    `);

    // BODY //
    $('body').prepend(`\n<header>\n\t<nav>\n\t</nav>\n</header>\n`);
    $('body').append(`\n<footer>\n</footer>\n`);

    $('nav').load('/assets/imports/navigation');
    $('footer').load('/assets/imports/footer');
    $('footer').append(data.footer_content)

    $('main').html($('#page-loader-content').html());

    $('#page-loader-content').remove();
    $('#page-loader-script').remove();
    $('[src="/loader.js"]').remove();

    loadCount++;

}