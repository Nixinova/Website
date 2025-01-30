function random(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function show_more(sourceId, targetId, rvcols) {
    const source = $('#' + sourceId);
    const target = $('#' + targetId);
    source.toggleClass('minus').toggleClass('elipsis');
    target.toggleClass("hide");
    if (rvcols) target.toggleClass("row");
}

function toggleOnOff(id) {
    $(id).toggleClass('on').toggleClass('off');
}

function copyCommand() {
    let box = document.createElement('textarea');
    box.value = window.Output;
    document.body.appendChild(box);
    box.select();
    document.execCommand('copy');
    document.body.removeChild(box);
}

function value(id, type) {
    const val = $('#' + id).val().trim();
    switch (type) {
        case 'int': return val ? parseInt(val, 10) : null;
        case 'num': return val ? parseFloat(val) : null;
        default: return val;
    }
}

function checked(id) {
    return document.getElementById(id).checked;
}

function cleanup(id) {
    // Cleanup item ID
    return id.toLowerCase()
        .replace(/[ -]/g, '_')
        .replace(/[^a-z_:]/g, '')
        .replace(/_+/g, '_')
        .replace(/:+/g, ':')
        .replace(/:_/g, ':');
}

function isEmpty(object) {
    for (const key in object) return false;
    return true;
}

function rvNestedDupes(array) {
    let newArray = [];
    let itemsFound = {};
    for (let x of array) {
        let str = JSON.stringify(x);
        if (itemsFound[str]) continue;
        newArray.push(x);
        itemsFound[str] = true;
    }
    return newArray;
}

function rvDupes(array) {
    let newArray = [];
    for (const a in array) {
        if (!newArray.includes(array[a])) {
            newArray.push(array[a]);
        }
        if (newArray[a] == null) {
            newArray.splice(a, 1);
        }
    }
    return newArray;
}

/** stringify with single quotes instead of JSON.stringify's double quotes */
function convertToSbnt(obj) {
    const parts = [];
    for (const key in obj) {
        parts.push(`'${key}':'${obj[key]}'`);
    }
    return parts.join(',');
}

/** Allowed units: 't', 's', 'm', 'h'. */
function convertGameUnit(num, unit) {
    let interval = 1;
    switch (unit) { // fallthrough
        case 'h': interval *= 60;
        case 'm': interval *= 60;
        case 's': interval *= 20;
        case 't': // do nothing
    }
    return num * interval;
}

function randomString(length) {
    let chars = [], output = '';
    for (let i = 32; i <= 591; i++) {
        chars.push(String.fromCharCode(i));
    }
    for (let i = 0; i < length; i++) {
        output += chars[random(0, chars.length - 1)];
    }
    return output.replace(/ /g, '\u00a0');
}

function obfuscate(input, element) {
    const randString = randomString(input.length);
    if (element) $(element).text(randString);
    else return randString;
}

function copy(text) {
    navigator.clipboard.writeText(text);
}

/* Copyright © Nixinova 2021 */
