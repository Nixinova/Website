/// FUNCTIONS ///

function value(id, n) {
    if (n == 'int') {return parseInt(document.getElementById(id).value, 10);}
    if (n == 'num') {return parseFloat(document.getElementById(id).value, 10);}
    else {return $.trim(document.getElementById(id).value);}
}

function id(id) {
    return document.getElementById(id);
}

function coord(type) {

    /// VARIABLES ///
    // call from input form //
    var overworld_block_x = value('overworld_block_x');
    var overworld_block_y = value('overworld_block_y');
    var overworld_block_z = value('overworld_block_z');
    var overworld_chunk_x = value('overworld_chunk_x');
    var overworld_chunk_y = value('overworld_chunk_y');
    var overworld_chunk_z = value('overworld_chunk_z');
    var nether_block_x = value('nether_block_x');
    var nether_block_y = value('nether_block_y');
    var nether_block_z = value('nether_block_z');
    var nether_chunk_x = value('nether_block_x');
    var nether_chunk_y = value('nether_block_y');
    var nether_chunk_z = value('nether_block_z');
    var region_x = value('region_x');
    var region_z = value('region_z');

    /// GENERATOR ///

    if (!type && (overworld_block_x || overworld_block_y || overworld_block_z)) {
        nether_block_x    = Math.floor(overworld_block_x / 8);
        nether_block_y    = overworld_block_y;
        nether_block_z    = Math.floor(overworld_block_z / 8);
        overworld_chunk_x = Math.floor(overworld_block_x / 16);
        overworld_chunk_y = Math.floor(overworld_block_y / 16);
        overworld_chunk_z = Math.floor(overworld_block_z / 16);
        nether_chunk_x    = Math.floor(nether_block_x / 16);
        nether_chunk_y    = Math.floor(nether_block_y / 16);
        nether_chunk_z    = Math.floor(nether_block_z / 16);
        region_x          = Math.floor(overworld_block_x / 512);
        region_z          = Math.floor(overworld_block_z / 512);
    }

    if (type == 'nether' && (nether_block_x || nether_block_y || nether_block_z)) {
        overworld_block_x   = Math.floor(nether_block_x * 8);
        overworld_block_y   = nether_block_y;
        overworld_block_z   = Math.floor(nether_block_z * 8);
        overworld_chunk_x   = Math.floor(nether_block_x / 16);
        overworld_chunk_y   = Math.floor(nether_block_y / 16);
        overworld_chunk_z   = Math.floor(nether_block_z / 16);
        region_x            = Math.floor(nether_block_x / 512);
        region_z            = Math.floor(nether_block_z / 512);
    }

    if (type == 'chunk' && (overworld_chunk_x || overworld_chunk_y || overworld_chunk_z)) {
        overworld_block_x   = Math.floor(overworld_chunk_x / 16);
        overworld_block_y   = Math.floor(overworld_chunk_y / 16);
        overworld_block_z   = Math.floor(overworld_chunk_z / 16);
        nether_block_x      = Math.floor(overworld_chunk_x * 2);
        nether_block_y      = Math.floor(overworld_chunk_y * 2);
        nether_block_z      = Math.floor(overworld_chunk_z * 2);
        region_x            = Math.floor(overworld_chunk_x / 32);
        region_z            = Math.floor(overworld_chunk_z / 32);
    }

    /// OUTPUT ///
    id('overworld_block_x').value = overworld_block_x;
    id('overworld_block_y').value = overworld_block_y;
    id('overworld_block_z').value = overworld_block_z;
    id('overworld_chunk_x').value = overworld_chunk_x;
    id('overworld_chunk_y').value = overworld_chunk_y;
    id('overworld_chunk_z').value = overworld_chunk_z;
    id('nether_block_x'   ).value = nether_block_x;
    id('nether_block_y'   ).value = nether_block_y;
    id('nether_block_z'   ).value = nether_block_z;
    id('nether_chunk_x'   ).value = nether_chunk_x;
    id('nether_chunk_y'   ).value = nether_chunk_y;
    id('nether_chunk_z'   ).value = nether_chunk_z;
    id('region_x'         ).value = region_x;
    id('region_z'         ).value = region_z;
}

function copy(text) {
    let box = document.createElement('textarea');
    box.value = text;
    document.body.appendChild(box);
    box.select();
    document.execCommand('copy');
    document.body.removeChild(box);
}

function copyBlock() {
    submit();
    copy(id('overworld_block_x').value + ' ' + id('overworld_block_y').value + ' ' + id('overworld_block_z').value);
}

function copyNether() {
    submit();
    copy(id('nether_block_x').value + ' ' + id('nether_block_y').value + ' ' + id('nether_block_z').value);
}

function copyChunk() {
    submit();
    copy(id('overworld_chunk_x').value + ' ' + id('overworld_chunk_y').value + ' ' + id('overworld_chunk_z').value);
}

function submit(id) {
    try {
        coord(id);
    }
    catch (error) {
        alert('Error on submit: ' + error + '.');
    }
}

/* Copyright © Nixinova 2020 */