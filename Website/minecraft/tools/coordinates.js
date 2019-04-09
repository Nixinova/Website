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
    var block_x = value('block_x');
    var block_y = value('block_y');
    var block_z = value('block_z');
    var chunk_x = value('chunk_x');
    var chunk_y = value('chunk_y');
    var chunk_z = value('chunk_z');
    var nether_x = value('nether_x');
    var nether_y = value('nether_y');
    var nether_z = value('nether_z');
    var region_x = value('region_x');
    var region_y = NaN; // should stay unused
    var region_z = value('region_z');

    /// GENERATOR ///

    if (!type && (block_x || block_y || block_z)) {
        nether_x  = Math.floor(block_x / 8);
        nether_y  = block_y;
        nether_z  = Math.floor(block_z / 8);
        chunk_x   = Math.floor(block_x / 16);
        chunk_y   = Math.floor(block_y / 16);
        chunk_z   = Math.floor(block_z / 16);
        region_x  = Math.floor(block_x / 512);
        region_z  = Math.floor(block_z / 512);
    }

    if (type == 'nether' && (nether_x || nether_y || nether_z)) {
        block_x   = Math.floor(nether_x * 8);
        block_y   = nether_y;
        block_z   = Math.floor(nether_z * 8);
        chunk_x   = Math.floor(nether_x / 16);
        chunk_y   = Math.floor(nether_y / 16);
        chunk_z   = Math.floor(nether_z / 16);
        region_x  = Math.floor(nether_x / 512);
        region_z  = Math.floor(nether_z / 512);
    }

    if (type == 'chunk' && (chunk_x || chunk_y || chunk_z)) {
        block_x   = Math.floor(chunk_x / 16);
        block_y   = Math.floor(chunk_y / 16);
        block_z   = Math.floor(chunk_z / 16);
        nether_x  = Math.floor(chunk_x * 2);
        nether_y  = Math.floor(chunk_y * 2);
        nether_z  = Math.floor(chunk_z * 2);
        region_x  = Math.floor(chunk_x / 32);
        region_z  = Math.floor(chunk_z / 32);
    }

    /// OUTPUT ///
    id( 'block_x').value = ( block_x);
    id( 'block_y').value = ( block_y);
    id( 'block_z').value = ( block_z);
    id( 'chunk_x').value = ( chunk_x);
    id( 'chunk_y').value = ( chunk_y);
    id( 'chunk_z').value = ( chunk_z);
    id('nether_x').value = (nether_x);
    id('nether_y').value = (nether_y);
    id('nether_z').value = (nether_z);
    id('region_x').value = (region_x);
    id('region_z').value = (region_z);

/*
    id('region_x_min_chunk').innerHTML = (region_x * 32);
    id('region_y_min_chunk').innerHTML = 0;
    id('region_z_min_chunk').innerHTML = (region_z * 32);
    id('region_x_max_chunk').innerHTML = (region_x + 1<<5) - 1;
    id('region_y_max_chunk').innerHTML = 15;
    id('region_z_max_chunk').innerHTML = ((region_x + 1<<5) - 1);

    id('region_x_min_block').innerHTML = (region_x * 512);
    id('region_y_min_block').innerHTML = 0;
    id('region_z_min_block').innerHTML = (region_z * 512);
    id('region_x_max_block').innerHTML = ((region_x + 1 << 9) - 1);
    id('region_y_max_block').innerHTML = 255;
    id('region_z_max_block').innerHTML = ((region_x + 1 << 9) - 1);
*/
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
    copy(id('block_x').value + ' ' + id('block_y').value + ' ' + id('block_z').value);
}

function copyNether() {
    submit();
    copy(id('nether_x').value + ' ' + id('nether_y').value + ' ' + id('nether_z').value);
}

function copyChunk() {
    submit();
    copy(id('chunk_x').value + ' ' + id('chunk_y').value + ' ' + id('chunk_z').value);
}

function submit(id) {
    try {
        coord(id);
    }
    catch (error) {
        alert('Error on submit: ' + error + '.');
    }
    finally {
        coord(id);
    }
}

/* Copyright 2018 Nixinova */