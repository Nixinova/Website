const blogs = { titles: [], urls: [], dates: [], excerpts: [], authors: [], images: [] };

document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetch('https://cors-anywhere.herokuapp.com/https://hytale.com/api/blog/post/published').then(data => data.json());
    $('#titles').html('');
    for (let i in data) {
        blogs.titles.push(data[i].title);
        blogs.urls.push(data[i].slug);
        blogs.dates.push(data[i].publishedAt);
        blogs.excerpts.push(data[i].bodyExcerpt);
        blogs.authors.push(data[i].author);
        blogs.images.push(data[i].coverImage.s3Key);
        $('#titles').append(`<option value="${blogs.urls[i]}">${blogs.titles[i]}</option>`);
    }
    $('#get-info').css('display', 'initial');
});

function getInfo() {
    let selected_blog = $('#titles').val();
    let index = blogs.urls.indexOf(selected_blog);

    let date = moment.utc(blogs.dates[index]);
    let image = 'https://cdn.hytale.com/variants/blog_cover_' + blogs.images[index];
    let url = `https://hytale.com/news/${date.year()}/${date.month() + 1}/${selected_blog}`;
    let title = blogs.titles[index];
    let author = blogs.authors[index];
    let excerpt = blogs.excerpts[index];

    $('output').html(`
        <img src="${image}">
        <h3>${title}</h3>
        <em>
            Posted on <time datetime="${blogs.dates[index]}">${date.format('dddd D MMMM YYYY [at] HH:mm:ss [UTC]')}</time>
            by ${author}
        </em>
        <p style="line-height: 1.8;">
            ${excerpt}
            <a href="${url}">(read more)</a>
        </p>
    `);
}

/* Copyright © Nixinova 2021 */
