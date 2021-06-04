document.addEventListener('DOMContentLoaded', async () => {
    const index = await fetch('/index.json').then(data => data.json());
    const metadata = {};
    const searcher = lunr(function () {
        this.ref('url');
        this.field('title');
        this.field('description');
        this.field('tags');
        for (let page of index) {
            this.add(page);
            metadata[page.url] = page;
        }
    });

    const query = new URLSearchParams(location.href).get('q');
    const matches = searcher.search(query);
    $('#search-box').val(query);

    if (query) for (page of matches) {
        const id = page.ref;
        let result = `
            <div class="result">
                <div class="result_url">${id.replace('.html', '').replace(/^\//, '').replace(/\//g, ' › ')}</div>
                <div class="result_title"><a href="${id}">${metadata[id].title}</a></div>
                <div class="result_description">${metadata[id].description}</div>
            </div>
        `;
        for (let word of query.split(' ')) {
            result = result.replace(RegExp(word, 'ig'), match => '<strong>' + match + '</strong>');
        }
        $('#results').append(result);
    }
});
