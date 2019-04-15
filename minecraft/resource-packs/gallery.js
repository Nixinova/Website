var $text = $('#pause-text');

function scrollGallery(_paths, _images, _captions, duplicates) {
        const $gallery = $('#gallery');
        const $galleryImg = $('#gallery .screenshot')
        const $caption = $('#caption p');
        const paths = _paths;
        const images = _images;
        const captions = _captions;

        if (duplicates == 'all') {
            for (ii in images) {
                paths[ii] = paths[0]
            }
        }
        
        const src = '/images/minecraft/resource-packs/' + paths[i] + '/' + images[i];

        $('#gallery a').attr('href', src);
        $galleryImg.css("background-image", "url('" + src + "')").attr("alt", caption[i]);
        $caption.html(captions[i]);

        i++;
        if (i >= images.length) {i = 0;}
};

function gallery(_paths, _images, _captions, duplicates) {
    if ($text.html() == 'pause') {
        scrollGallery(_paths, _images, _captions, duplicates)
    }
};

function togglePlay() {
    if ($text.html() == 'pause') {
        $text.html('play_arrow');
    } else {
        $text.html('pause');
    }
}