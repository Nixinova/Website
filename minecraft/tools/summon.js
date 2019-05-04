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
    var baby_mobs = ['drowned', 'zombie', 'zombie_pigman', 'zombie_villager']
    var neg_age_mobs = [
        'cat', 'chicken', 'cow', 'fox', 'llama', 'mooshroom', 'rabbit', 'ocelot', 'panda',
        'pig', 'polar_bear', 'sheep', 'villager', 'wolf',
        'horse', 'donkey', 'mule', 'skeleton_horse', 'zombie_horse'
    ]
    var tame_mobs = [
        'horse', 'donkey', 'mule', 'skeleton_horse', 'zombie_horse', 'llama'
    ]

    // call from input form //
    var entity = value('input_entity').toLowerCase().replace(/ /g, '_');
    var X = value('input_x').replace(/[^0-9-~^]/g, '');
    var Y = value('input_y').replace(/[^0-9-~^]/g, '');
    var Z = value('input_z').replace(/[^0-9-~^]/g, '');

    var no_ai = $('#input_no_ai').hasClass('on');
    var despawnable = $('#input_despawnable').hasClass('on');

    var baby = $('#input_is_baby').hasClass('on');
    var baby_time = value('input_baby_time');
    var baby_time_value = value('input_baby_time_value');
    var cat_type = value('input_cat_type', 'int')
    var cat_collar = value('input_cat_collar', 'int')
    var creeper_powered = $('#input_creeper_powered').hasClass('on');
    var fox_type = cleanup(value('input_fox_type'));
    var llama_type = value('input_llama_type', 'int')
    var llama_temper = value('input_llama_temper', 'int')
    var horse_tame = $('#input_horse_tame').hasClass('on');
    var mob_color = value('input_mob_color', 'int')
    var mooshroom_type = cleanup(value('input_mooshroom_type'))
    var tropical_fish_size = value('input_tropical_fish_size', 'int');
    var tropical_fish_pattern = value('input_tropical_fish_pattern', 'int');
    var tropical_fish_base_color = value('input_tropical_fish_base_color', 'int');
    var tropical_fish_pattern_color = value('input_tropical_fish_pattern_color', 'int');
    var villager_type = cleanup(value('input_villager_type'));
    var villager_profession = cleanup(value('input_villager_profession'));
    var villager_level = value('input_villager_level', 'int');

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

    // ENTITY NBT //

    // all //
    if (!no_ai) {nbt.NoAI = true;}
    if (!despawnable) {nbt.PersistenceRequired = true;}

    // babies //
    if (baby_mobs.indexOf(entity) > -1) {
        $('.baby_mobs').removeClass('hide');
        if (baby) {nbt.IsBaby = true;}
    }
    if (neg_age_mobs.indexOf(entity) > -1) {
        $('.baby_mobs').removeClass('hide');
        $('.baby_living_mobs').removeClass('hide');
        if (baby_time_value) {
            if (baby_time == 't') {nbt.Age = 1-baby_time_value}
            if (baby_time == 's') {nbt.Age = 1-baby_time_value*20}
            if (baby_time == 'm') {nbt.Age = 1-baby_time_value*1200}
            if (baby_time == 'h') {nbt.Age = 1-baby_time_value*72000}
        }
    }

    // cat //
    if (entity === 'cat') {
        if (cat_type) {nbt.CatType = cat_type;}
        if (cat_collar) {nbt.CollarColor = cat_collar;}
    }

    // coloured mobs //
    if (entity === 'sheep' || entity === 'shulker') {
        if (mob_color) {nbt.Color = mob_color;}
    }

    // creeper //
    if (entity === 'creeper') {
        if (creeper_powered) {nbt.powered = true;}
    }

    // fox //
    if (entity === 'fox') {
        if (fox_type) {nbt.Type = fox_type;}
    }

    // llama //
    if (entity === 'llama') {
        if (llama_type) {nbt.Variant = llama_type;}
        if (llama_temper) {nbt.Temper = llama_temper;}
    }

    // mooshroom //
    if (entity === 'mooshroom') {
        if (mooshroom_type) {nbt.Type = mooshroom_type;}
    }

    // tame mobs //
    if (tame_mobs.indexOf(entity) > -1) {
        $('.tame_mobs.only').removeClass('hide');
        if (horse_tame) {nbt.Tame = true;}
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
        alert('Error on submit: ' + error.message);
    }
    finally {
        summon();
    }
}

/* Copyright 2018 Nixinova */