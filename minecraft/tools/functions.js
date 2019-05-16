function show_more(sourceId, targetId, rvcols) {
    var source = $('#' + sourceId)
    var target = $('#' + targetId)
    
    source.toggleClass('minus')
    source.toggleClass('elipsis')
    target.toggleClass("hide")

    if (rvcols) {target.toggleClass("row")}
}

function getQueryString(val) {
    let href = window.location.href.split('#')
    let query = href[1]? href[1].split('&') : '';
    if (query) {
        let regexMatch = new RegExp('(\\?|)' + val + '=.+');
        let regexReplace = new RegExp('(\\?|)' + val + '=');
        let times = 0;
        for (var i in query) {
            if (query[i].match(regexMatch)) {
                return query[i].replace(regexReplace, '');
            } else {times++;}
        }
        if (times === 0) {return '';}
    }
}

function value(id, type) {
    if (function_count > 0) {
        let queryVar = getQueryString(id.replace(/(input_)/,''));
        if (type === 'int') return parseInt($('#'+id).val(), 10);
        else if (type === 'num') return parseFloat($('#'+id).val(), 10);
        else if (queryVar) {
            $(id).val(queryVar);
            return $.trim(queryVar);
        }
        else return $.trim($(id).val());
    } else {
        if (type === 'int') return parseInt($('#'+id).val(), 10);
        else if (type === 'num') return parseFloat($('#'+id).val(), 10);
        else return $.trim($(id).val());
    }
}

function checked(id) {
    return document.getElementById(id).checked;
}

function isEmpty(object) {
    for (key in object) {
        if (object.hasOwnProperty(key)) return false;
    }
    return true;
}

function rvNestedDupes(array) {
    let newArray = [];
    let itemsFound = {};
    for (i = 0; i < array.length; i++) {
        let str = JSON.stringify(array[i]);
        if (itemsFound[str]) {continue};
        newArray.push(array[i]);
        itemsFound[str] = true;
    }
    return newArray;
}

function rvDupes(array) {
    let newArray = [];
    for (a = 0; a < array.length; a++) {
        if (newArray.indexOf(array[a]) == -1) {
            newArray.push(array[a]);
        }
        if (newArray[a] == null) {newArray.splice(a,1);}
    }
    return newArray;
}