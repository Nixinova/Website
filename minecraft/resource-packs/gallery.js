var $text = $('#pause-text');
var count = 0;

function gallery(_paths, _images, _captions, duplicates) {
    if ($text.html() == 'pause' || count === 0) {
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

        $galleryImg.css("background-image", "url('" + src + "')").attr("alt", caption[i]);
        $caption.html(captions[i]);

        i++;
        if (i >= images.length) {i = 0;}
        count++;
    }
};

function togglePlay() {
    if ($text.html() == 'pause') {
        $text.html('play_arrow');
    } else {
        $text.html('pause');
    }
}
