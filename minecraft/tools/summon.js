/// FUNCTIONS ///

function value(id, n) {
    if (n == 'int') {return parseInt(document.getElementById(id).value, 10);}
    if (n == 'num') {return parseFloat(document.getElementById(id).value, 10);}
    else {return $.trim(document.getElementById(id).value);}
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

/// SUBMIT ///

function summon() {

    /// VARIABLES ///
    // call from input form //
    var entity = value('input_entity').toLowerCase().replace(/ /g, '_');
    var X = value('input_x').replace(/[^0-9-~^]/g, '');
    var Y = value('input_y').replace(/[^0-9-~^]/g, '');
    var Z = value('input_z').replace(/[^0-9-~^]/g, '');

    var head = value('input_armour_head' ).toLowerCase().replace(/[ -]/g, "_").replace(/[^a-z_:]/g,"").replace(/_+/g, "_").replace(/:+/g, ":");
    var chest= value('input_armour_chest').toLowerCase().replace(/[ -]/g, "_").replace(/[^a-z_:]/g,"").replace(/_+/g, "_").replace(/:+/g, ":");
    var legs = value('input_armour_legs' ).toLowerCase().replace(/[ -]/g, "_").replace(/[^a-z_:]/g,"").replace(/_+/g, "_").replace(/:+/g, ":");
    var feet = value('input_armour_feet' ).toLowerCase().replace(/[ -]/g, "_").replace(/[^a-z_:]/g,"").replace(/_+/g, "_").replace(/:+/g, ":");
    var head_n = value('input_armour_head_num');
    var chest_n = value('input_armour_chest_num');
    var legs_n = value('input_armour_legs_num');
    var feet_n = value('input_armour_feet_num');

    var mainhand = value('input_held_item' ).toLowerCase().replace(/[ -]/g, "_").replace(/[^a-z_:]/g,"").replace(/_+/g, "_").replace(/:+/g, ":");
    var mainhand_n = value('input_held_item_num');
    var offhand = value('input_offhand_item' ).toLowerCase().replace(/[ -]/g, "_").replace(/[^a-z_:]/g,"").replace(/_+/g, "_").replace(/:+/g, ":");
    var offhand_n = value('input_offhand_item_num');

    var nbt = {}

    /// GENERATOR ///
    // output //
    $('#output_text').empty();
    $('#cmd_note').addClass('hide');

    // summon //
    if (!X) {X = '~';}   if (!Y) {Y = '~';}   if (!Z) {Z = '~';}

    var armor_items = [];
    if (feet) {armor_items.push({id: feet, Count: feet_n + 'b'});} else {armor_items.push({});}
    if (legs) {armor_items.push({id: legs, Count: legs_n + 'b'});} else {armor_items.push({});}
    if (chest) {armor_items.push({id: chest, Count: chest_n + 'b'});} else {armor_items.push({});}
    if (head) {armor_items.push({id: head, Count: head_n + 'b'});} else {armor_items.push({});}
    if (head || chest || legs || feet) {nbt.ArmorItems = armor_items;}

    var held_items = [];
    if (mainhand) {held_items.push({id: mainhand, Count: mainhand_n + 'b'});} else {held_items.push({});}
    if (offhand) {held_items.push({id: offhand, Count: offhand_n + 'b'});} else {held_items.push({});}
    if (mainhand || offhand) {nbt.HandItems = held_items;}

    // nbt //
    if (!isEmpty(nbt)) {
        var NBT = JSON.stringify(nbt).replace(/"([^(")\\]+)":/g,'$1:');
    } else {NBT = '';}

    /// OUTPUT ///
    const _ = ' ';
    var output = '/summon ' + entity +_+ X +_+ Y +_+ Z +_+ NBT;
    if (output.length > 256) {
        $('#cmd_note').removeClass('hide');
    }
    $('#output_text').append(
        '<span style="color: lightgray">/summon</span> ' +
        '<span style="color: #5ff">' + entity + '</span> ' +
        '<span style="color: #ff5">' + X +_+ Y +_+ Z + '</span> ' +
        '<span style="color: lightgreen">' + NBT + '</span>'
    );

    // copy text
    let box = document.createElement('textarea');
    box.value = output;
    document.body.appendChild(box);
    box.select();
    document.execCommand('copy');
    document.body.removeChild(box);
}

function submit() {
    try {
        summon();
    }
    catch (error) {
        alert('Error on submit: ' + error.message + '.');
    }
    finally {
        summon();
    }
}

/* Copyright 2018 Nixinova */