var $text = $('#pause-text');
var count = 0;

function gallery(arr) {
    if ($text.html() == 'pause' || count === 0) {
        const $gallery_img = $('#gallery .screenshot')
        const $caption = $('#caption p');
        for (i in arr) {
            if (arr[arr[i].path]) {arr[i].path = arr[arr[i].path].path}
            
            var src = '/images/minecraft/resource-packs/' + arr[i].path + '/' + arr[i].img;

            $gallery_img.css("background-image", "url('" + src + "')").attr("alt", arr[i].caption);
            $caption.html(arr[i].items.caption);

            //i++;
            //if (i >= images.length) {i = 0;}
            //count++;
        }
    }
};

function togglePlay() {
    if ($text.html() == 'pause') {
        $text.html('play_arrow');
    } else {
        $text.html('pause');
    }
}
