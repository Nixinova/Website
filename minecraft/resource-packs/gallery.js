var $text = $('#pause-text');

function togglePlay() {
    try{
    if ($text.html() == 'pause') {
        $text.html('play_arrow');
    } else {
        $text.html('pause');
    }
}catch(e){alert(e.stack);}
}

function gallery(arr) {
    try{
    if ($text.html() == 'pause') {
        const $gallery_img = $('#gallery .screenshot')
        let src = 'https://images.nixinova.com/minecraft/resource-packs/' + arr[i];
        $gallery_img.css("background-image", "url('" + src + "')");

        i++;
        if (i >= arr.length) {i = 0;}
    }
}catch(e){alert(e.stack);}
};