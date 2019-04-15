var play = true;

function gallery(_paths, _images, _captions) {
    if (play) {
        const $gallery = $('#gallery');
        const $galleryImg = $('#gallery .screenshot')
        const $caption = $('#caption p');
        const paths = _paths;
        const images = _images;
        const captions = _captions;
        const src = '/images/minecraft/resource-packs/' + paths[i] + '/' + images[i];

        $('#gallery a').attr('href', src);
        $galleryImg.css("background-image", "url('" + src + "')").attr("alt", caption[i]);
        caption.html('<p>' + captions[i] + '</p>');

        i++;
        if (i >= images.length) {i = 0;}
    }
};

function togglePlay() {
    const $text = $('#pause-text')
    if (play) {
        play = false;
        $text.html('play_arrow');
    } else {
        play = true;
        $text.html('pause');
    }
}