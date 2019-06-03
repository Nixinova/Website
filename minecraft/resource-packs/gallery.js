function gallery(arr) {
    const $gallery_img = $('#gallery .screenshot')
    let src = '/images/minecraft/resource-packs/' + arr[i];
    $gallery_img.css("background-image", "url('" + src + "')");

    i++;
    if (i >= arr.length) {i = 0;}
};