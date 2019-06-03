var count = 0;

function togglePlay() {
    if ($text.html() == 'pause') {
        $text.html('play_arrow');
    } else {
        $text.html('pause');
    }
}

function gallery(arr) {
    const $gallery_img = $('#gallery .screenshot')
    let src = '/images/minecraft/resource-packs/' + arr[i];
    $gallery_img.css("background-image", "url('" + src + "')");
    
    i++;
    if (i >= images.length) {i = 0;}
};