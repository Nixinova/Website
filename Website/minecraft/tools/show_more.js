function show_more(sourceId, targetId, rvcols) {
    var source = $('#' + sourceId)
    var target = $('#' + targetId)
    
    source.toggleClass('minus')
    source.toggleClass('elipsis')
    target.toggleClass("hide")

    if (rvcols) {target.toggleClass("row")}
}