var $text = $('#pause-text');
var count = 0;

function togglePlay() {
    if ($text.html() == 'pause') {
        $text.html('play_arrow');
    } else {
        $text.html('pause');
    }
}

function gallery(arr) {
    if ($text.html() == 'pause' || count === 0) {
        const $gallery_img = $('#gallery .screenshot')
        for (i in arr) {
            let src = '/images/minecraft/resource-packs/' + arr[i];
            $gallery_img.css("background-image", "url('" + src + "')");
        }
    }
    count++;
};
