function coords() {
    /// VARIABLES ///
    // call from input form //
    const getXYZ = (text) => ({ x: value(`${text}_x`), y: value(`${text}_y`), z: value(`${text}_z`) });
    const getXZ = (text) => ({ x: value(`${text}_x`), z: value(`${text}_z`) });
    const overworld_block = getXYZ('overworld_block');
    const overworld_chunk = getXYZ('overworld_chunk');
    const nether_block = getXYZ('nether_block');
    const nether_chunk = getXYZ('nether_chunk');
    const overworld_region = getXZ('overworld_region');
    const nether_region = getXZ('nether_region');

    /// GENERATOR ///
    if (coordsType === 'overworld_block') {
        nether_block.x = Math.floor(overworld_block.x / 8);
        nether_block.y = overworld_block.y;
        nether_block.z = Math.floor(overworld_block.z / 8);
        nether_chunk.x = Math.floor(nether_block.x / 16);
        nether_chunk.y = Math.floor(nether_block.y / 16);
        nether_chunk.z = Math.floor(nether_block.z / 16);
        overworld_chunk.x = Math.floor(overworld_block.x / 16);
        overworld_chunk.y = Math.floor(overworld_block.y / 16);
        overworld_chunk.z = Math.floor(overworld_block.z / 16);
        overworld_region.x = Math.floor(overworld_block.x / 512);
        overworld_region.z = Math.floor(overworld_block.z / 512);
        nether_region.x = Math.floor(overworld_region.x / 8);
        nether_region.z = Math.floor(overworld_region.z / 8);
    }
    else if (coordsType === 'overworld_chunk') {
        overworld_block.x = overworld_chunk.x * 16;
        overworld_block.y = overworld_chunk.y * 16;
        overworld_block.z = overworld_chunk.z * 16;
        nether_block.x = overworld_block.z / 8;
        nether_block.y = overworld_block.z / 8;
        nether_block.z = overworld_block.z / 8;
        overworld_region.x = Math.floor(overworld_block.x / 512);
        overworld_region.z = Math.floor(overworld_block.z / 512);
        nether_region.x = Math.floor(overworld_region.x / 8);
        nether_region.z = Math.floor(overworld_region.z / 8);
    }
    else if (coordsType === 'nether_block') {
        overworld_block.x = nether_block.x * 8;
        overworld_block.y = nether_block.y;
        overworld_block.z = nether_block.z * 8;
        nether_chunk.x = Math.floor(nether_block.x / 16);
        nether_chunk.y = Math.floor(nether_block.y / 16);
        nether_chunk.z = Math.floor(nether_block.z / 16);
        overworld_chunk.x = Math.floor(overworld_block.x / 16);
        overworld_chunk.y = Math.floor(overworld_block.y / 16);
        overworld_chunk.z = Math.floor(overworld_block.z / 16);
        overworld_region.x = Math.floor(overworld_block.x / 512);
        overworld_region.z = Math.floor(overworld_block.z / 512);
        nether_region.x = Math.floor(overworld_region.x / 8);
        nether_region.z = Math.floor(overworld_region.z / 8);
    }
    else if (coordsType === 'nether_chunk') {
        overworld_block.x = nether_chunk.x * 128;
        overworld_block.y = nether_block.y;
        overworld_block.z = nether_chunk.z * 128;
        nether_block.x = Math.floor(nether_chunk.x / 16);
        nether_block.y = Math.floor(nether_chunk.y / 16);
        nether_block.z = Math.floor(nether_chunk.z / 16);
        overworld_chunk.x = nether_chunk.x * 8;
        overworld_chunk.y = nether_chunk.y;
        overworld_chunk.z = nether_chunk.z * 8;
        overworld_region.x = Math.floor(overworld_block.x / 512);
        overworld_region.z = Math.floor(overworld_block.z / 512);
        nether_region.x = Math.floor(overworld_region.x / 8);
        nether_region.z = Math.floor(overworld_region.z / 8);
    }
    else if (coordsType === 'overworld_region') {
        overworld_block.x = overworld_region.x * 128;
        overworld_block.z = overworld_region.z * 128;
        overworld_chunk.x = overworld_region.x * 32;
        overworld_chunk.z = overworld_region.z * 32;
        nether_block.x = overworld_region.x * 8;
        nether_block.z = overworld_region.z * 8;
        nether_chunk.x = overworld_region.x * 4;
        nether_chunk.z = overworld_region.z * 4;
        nether_region.x = Math.floor(overworld_region.x / 8);
        nether_region.z = Math.floor(overworld_region.z / 8);
    }
    else if (coordsType === 'nether_region') {
        overworld_region.x = nether_region.x * 8;
        overworld_region.z = nether_region.z * 8;
        overworld_block.x = overworld_region.x * 128;
        overworld_block.z = overworld_region.x * 128;
        overworld_chunk.x = overworld_region.x * 32;
        overworld_chunk.z = overworld_region.z * 32;
        nether_block.x = overworld_region.x * 8;
        nether_block.z = overworld_region.z * 8;
        nether_chunk.x = overworld_region.x * 4;
        nether_chunk.z = overworld_region.z * 4;
    }

    /// OUTPUT ///
    $('#overworld_block_x').val(overworld_block.x);
    $('#overworld_block_y').val(overworld_block.y);
    $('#overworld_block_z').val(overworld_block.z);
    $('#overworld_chunk_x').val(overworld_chunk.x);
    $('#overworld_chunk_y').val(overworld_chunk.y);
    $('#overworld_chunk_z').val(overworld_chunk.z);
    $('#nether_block_x').val(nether_block.x);
    $('#nether_block_y').val(nether_block.y);
    $('#nether_block_z').val(nether_block.z);
    $('#nether_chunk_x').val(nether_chunk.x);
    $('#nether_chunk_y').val(nether_chunk.y);
    $('#nether_chunk_z').val(nether_chunk.z);
    $('#overworld_region_x').val(overworld_region.x);
    $('#overworld_region_z').val(overworld_region.z);
    $('#nether_region_x').val(nether_region.x);
    $('#nether_region_z').val(nether_region.z);

}

function copyType(type) {
    submit();
    const values = [value(`${type}_x`), value(`${type}_y`), value(`${type}_z`)];
    copy(values.join(' '));
}

function submit() {
    try {
        coords();
    }
    catch (error) {
        alert("An unknown error has occurred. Please try again or reload the page.");
        console.error(error.stack);
    }
}

/* Copyright © Nixinova 2021 */
