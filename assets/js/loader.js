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
    }

    let og_title = data.og_title ? `<meta property="og:title" content="${data.og_title}">` : '';
    let og_desc = data.og_description ? `\n<meta property="og:description" content="${data.og_description}">` : '';
    let og_image = data.og_description ? `\n<meta property="og:image" content="https://nixinova.com/assets/images/${data.og_image}">` : '';

    $('html').attr('lang', 'en-NZ');

    // HEAD //
    $('[data-name="Default styles"]').remove();
    let headContent = $('head').html();
    $('head').empty();

    $('head').append(`
        <title>${data.title} ${!data.title ? 'Nixinova' : '– Nixinova'}</title>
        <meta name="description" content="${data.description.replace(/\n|  +/g, ' ')}">
        <meta name="keywords" content="${data.keywords.replace(/\n|  +/g, ' ').replace(/,+/g, ',')}">
        <meta name="author" content="Nixinova">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${og_title}${og_desc}${og_image}
        <link rel="icon" href="/favicon.ico">
        <link data-name="Main styles" rel="stylesheet" href="/assets/css/main.css">
        <link data-name="Fonts import" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
    `);

    for (let stylesheet of data.stylesheets) {
        if (stylesheet.includes('main')) continue; // already added in post-processing
        $('head').append(`\n\t<link data-name="Imported stylesheet" rel="stylesheet" href="/assets/css/${stylesheet}">`);
    }

    for (let script of data.scripts) {
        if (!script) continue;
        let src = script.startsWith('./') ? script.substr(2) : "/assets/js/"+script;
        $('head').append(`\n\t<script data-name="Imported script" src="${src}">`);
    }

    $('head').append(`
        <link data-name="FontAwesome styles" rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css">
        <script data-name="Moment.js import" src="https://momentjs.com/downloads/moment.js"></script>
        <script data-name="Google Analytics import" async src="https://www.googletagmanager.com/gtag/js?id=UA-83550713-1"></script>
        <script data-name="Google Analytics setup">window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-83550713-1');</script>
        ${headContent}
    `);

    // BODY //
    $('body').prepend(`\n<header>\n</header>\n`);
    $('body').append(`\n<footer>\n</footer>\n`);

    $('header').load('/assets/imports/header');
    $('footer').load('/assets/imports/footer');

    // Cleanup //
    $('#page-loader-script').remove();
    $('[src="/loader.js"]').remove();

    loadCount++;

}
