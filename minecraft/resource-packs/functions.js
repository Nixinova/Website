function gallery(_paths, _images, _captions) {
    if (play) {
        const $gallery = $('#gallery');
        const $galleryImg = $('#gallery .screenshot')
        const gallery = document.getElementById('gallery');
        const $caption = $('#caption p');
        const caption = document.getElementById('caption');
        const paths = _paths;
        const images = _images;
        const captions = _captions;
        const src = '/images/minecraft/resource-packs/' + paths[i] + '/' + images[i];

        $('#gallery a').attr('href', src);
        $galleryImg.css("background-image", "url('" + src + "')").attr("alt", caption[i]);
        caption.innerHTML = '<p>' + captions[i] + '</p>';

        i++;
        if (i >= images.length) {i = 0;}
    }
};