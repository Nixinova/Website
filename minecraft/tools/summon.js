/// FUNCTIONS ///

function value(id, n) {
    if (n === 'int') {return parseInt(document.getElementById(id).value, 10);}
    if (n === 'num') {return parseFloat(document.getElementById(id).value, 10);}
    else {return $.trim(document.getElementById(id).value);}
}

function cleanup(id) {
    return id.toLowerCase().replace(/[ -]/g, '_').replace(/[^a-z_:]/g,'').replace(/_+/g, '_').replace(/:+/g, ':').replace(/:_/g, ':');
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

    var fox_type = cleanup(value('input_fox_type'));
    var horse_tame = $('#input_horse_tame').hasClass('on');
    var tropical_fish_size = value('input_tropical_fish_size', 'int');
    var tropical_fish_pattern = value('input_tropical_fish_pattern', 'int');
    var tropical_fish_base_color = value('input_tropical_fish_base_color', 'int');
    var tropical_fish_pattern_color = value('input_tropical_fish_pattern_color', 'int');
    var mob_color = value('input_shulker_color', 'int')
    var villager_type = cleanup(value('input_villager_type'));
    var villager_profession = cleanup(value('input_villager_profession'));
    var villager_level = value('input_villager_level', 'int');
    var zombie_baby = $('#input_zombie_baby').hasClass('on');

    var head = cleanup(value('input_armour_head' ));
    var chest= cleanup(value('input_armour_chest'));
    var legs = cleanup(value('input_armour_legs' ));
    var feet = cleanup(value('input_armour_feet' ));
    var head_n = value('input_armour_head_num', 'int');
    var chest_n= value('input_armour_chest_num', 'int');
    var legs_n = value('input_armour_legs_num', 'int');
    var feet_n = value('input_armour_feet_num', 'int');

    var mainhand = cleanup(value('input_held_item'));
    var mainhand_n = value('input_held_item_num', 'int');
    var offhand = cleanup(value('input_offhand_item'));
    var offhand_n = value('input_offhand_item_num', 'int');

    var nbt = {}

    /// GENERATOR ///
    // OUTPUT //
    $('#output_text').empty();
    $('#cmd_note').addClass('hide');
    $('.only').addClass('hide');
    $('.' + entity).removeClass('hide');

    // COORDS //
    if (!X) {X = '~';}   if (!Y) {Y = '~';}   if (!Z) {Z = '~';}

    // SPECIFIC ENTITY NBT //

    // fox //
    if (entity === 'fox') {
        if (fox_type) {nbt.Type = fox_type;}
    }

    // horses //
    if (entity === 'donkey' || entity === 'horse' || entity === 'mule' || entity === 'skeleton_horse' || entity === 'zombie_horse') {
        if (horse_tame) {nbt.Tame = true;}
    }

    // colored mobs //
    if (entity === 'shulker' || entity === 'sheep') {
        if (mob_color) {nbt.Color = mob_color;}
    }

    // tropical fish //
    if (entity === 'tropical_fish') {
        if (tropical_fish_size === 0) {$('.large-fish').addClass('hide'); $('.small-fish').removeClass('hide');}
        if (tropical_fish_size === 1) {$('.small-fish').addClass('hide'); $('.large-fish').removeClass('hide');}
        let byte_1 = tropical_fish_size;
        let byte_2 = tropical_fish_pattern * Math.pow(2,8);
        let byte_3 = tropical_fish_base_color * Math.pow(2,16);
        let byte_4 = tropical_fish_pattern_color * Math.pow(2,24);
        nbt.Variant = byte_1 + byte_2 + byte_3 + byte_4;
    }

    // villager //
    if (entity === 'villager') {
        nbt.VillagerData = {};
        if (villager_type) {nbt.VillagerData.type = villager_type;}
        if (villager_profession) {nbt.VillagerData.profession = villager_profession;}
        if (villager_level) {nbt.VillagerData.level = villager_level;}
    }

    // zombies //
    if (entity === 'zombie' || entity === 'zombie_pigman' || entity === 'zombie_villager') {
        if (zombie_baby) {nbt.IsBaby = true;}
    }

    // EQUIPMENT //
    // armor //
    var armor_items = [];
    if (feet) {armor_items.push({id: feet, Count: feet_n});} else {armor_items.push({});}
    if (legs) {armor_items.push({id: legs, Count: legs_n});} else {armor_items.push({});}
    if (chest){armor_items.push({id: chest, Count: chest_n});} else {armor_items.push({});}
    if (head) {armor_items.push({id: head, Count: head_n});} else {armor_items.push({});}
    if (head || chest || legs || feet) {nbt.ArmorItems = armor_items;}

    // held //
    var held_items = [];
    if (mainhand) {held_items.push({id: mainhand, Count: mainhand_n});} else {held_items.push({});}
    if (offhand) {held_items.push({id: offhand, Count: offhand_n});} else {held_items.push({});}
    if (mainhand || offhand) {nbt.HandItems = held_items;}

    // CONVERT TO NBT //
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