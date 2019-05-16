/// FUNCTIONS ///

function cleanup(id) {
    return id.toLowerCase().replace(/[ -]/g, '_').replace(/[^a-z_:]/g,'').replace(/_+/g, '_').replace(/:+/g, ':').replace(/:_/g, ':');
}

/// SUBMIT ///

function summon() {
    //debug
    alert(window.location.href);

    /// VARIABLES ///
    var zombies = ['drowned', 'husk', 'zombie', 'zombie_pigman', 'zombie_villager']
    var neg_age_mobs = [
        'cat', 'chicken', 'cow', 'fox', 'llama', 'mooshroom', 'rabbit', 'ocelot', 'panda',
        'pig', 'polar_bear', 'sheep', 'villager', 'wolf',
        'horse', 'donkey', 'mule', 'skeleton_horse', 'zombie_horse'
    ]
    var tame_mobs = [
        'horse', 'donkey', 'mule', 'skeleton_horse', 'zombie_horse', 'llama'
    ]

    // call from input form //
    var query = '';
    if (window.location.href.search('?')) {
        query = window.location.href.split('?')[1].split('&');
    }
    for (i in query) {
        if (query[i].match(/entity=.+/)) {var $entity = query[i].replace(/entity=/, '');}
    }
    var entity = ($entity? $entity: (value('input_entity')? value('input_entity'): 'bat')).toLowerCase().replace(/ /g, '_');
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
    var endermite_life = value('input_endermite_life', 'int')
    var endermite_attackable = $('#input_endermite_attackable').hasClass('off');
    var $fox_type = $('#input_fox_type');
    var ghast_explosion_power = value('input_ghast_explosion_power');
    var llama_type = value('input_llama_type', 'int')
    var llama_temper = value('input_llama_temper', 'int')
    var horse_tame = $('#input_horse_tame').hasClass('on');
    var mob_color = value('input_mob_color', 'int')
    var mooshroom_type = cleanup(value('input_mooshroom_type'))
    var panda_dominant_gene = cleanup(value('input_panda_gene_1'));
    var panda_recessive_gene = cleanup(value('input_panda_gene_2'));
    var rabbit_type = value('input_rabbit_type','int')
    var slime_size = value('input_slime_size','int')
    var tropical_fish_size = value('input_tropical_fish_size', 'int');
    var tropical_fish_pattern = value('input_tropical_fish_pattern', 'int');
    var tropical_fish_base_color = value('input_tropical_fish_base_color', 'int');
    var tropical_fish_pattern_color = value('input_tropical_fish_pattern_color', 'int');
    var villager_type = cleanup(value('input_villager_type'));
    var villager_profession = cleanup(value('input_villager_profession'));
    var villager_level = value('input_villager_level', 'int');
    var zombies_canbreak_doors = $('#input_zombies_canbreak_doors').hasClass('on');

    var head = cleanup(value('input_armour_head' ));
    var chest= cleanup(value('input_armour_chest'));
    var legs = cleanup(value('input_armour_legs' ));
    var feet = cleanup(value('input_armour_feet' ));
    var head_n = value('input_armour_head_num',   'int');
    var chest_n= value('input_armour_chest_num',  'int');
    var legs_n = value('input_armour_legs_num',   'int');
    var feet_n = value('input_armour_feet_num',   'int');
    var head_c = value('input_armour_head_count' ,'num');
    var chest_c= value('input_armour_chest_count','num');
    var legs_c = value('input_armour_legs_count' ,'num');
    var feet_c = value('input_armour_feet_count' ,'num');

    var mainhand = cleanup(value('input_held_item'));
    var mainhand_n = value('input_held_item_num', 'int');
    var mainhand_c = value('input_held_item_count', 'num');
    var offhand = cleanup(value('input_offhand_item'));
    var offhand_n = value('input_offhand_item_num', 'int');
    var offhand_c = value('input_offhand_item_count', 'num');

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
    {
    // all //
    if (!no_ai) {nbt.NoAI = true;}
    if (!despawnable) {nbt.PersistenceRequired = true;}

    // tame mobs //
    if (tame_mobs.indexOf(entity) > -1) {
        $('.tame_mobs.only').removeClass('hide');
        if (horse_tame) {nbt.Tame = true;}
    }

    // cat //
    if (entity === 'cat') {
        if (cat_type !== null) {nbt.CatType = cat_type;}
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

    // endermite //
    if (entity === 'endermite') {
        if (endermite_life) {nbt.Lifetime = 2400-endermite_life}
        if (endermite_attackable) {nbt.PlayerSpawned = true;}
    }

    // fox //
    if (entity === 'fox') {
        if ($fox_type.hasClass('red') && foxCount > 0) {nbt.Type = 'red';}
        if ($fox_type.hasClass('snow')) {nbt.Type = 'snow';}
    }

    // ghast //
    if (entity === 'ghast') {
        if (ghast_explosion_power) {nbt.ExplosionPower = ghast_explosion_power;}
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

    // panda //
    if (entity === 'panda') {
        if (panda_dominant_gene) {nbt.MainGene = panda_dominant_gene;}
        if (panda_recessive_gene) {nbt.HiddenGene = panda_recessive_gene;}
    }

    // rabbit ..
    if (entity === 'rabbit') {
        if (rabbit_type !== null) {nbt.RabbitType = rabbit_type;}
    }

    // slime //
    if (entity === 'slime') {
        if (slime_size !== null) {nbt.Size = slime_size;}
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

    // wolf //
    if (entity === 'wolf') {
        if (wolf_collar) {nbt.CollarColor = wolf_collar;}
    }

    // zombies //
    if (zombies.indexOf(entity) > -1) {
        $('.zombies').removeClass('hide');
        if (zombies_canbreak_doors) {nbt.CanBreakDoors = true;}
    }

    // babies //
    if (zombies.indexOf(entity) > -1) {
        $('.baby_mobs').removeClass('hide');
        if (baby) {nbt.IsBaby = true;}
    }
    if (neg_age_mobs.indexOf(entity) > -1) {
        $('.baby_mobs').removeClass('hide');
        if (baby && baby_time_value) {
            if (baby_time == 't') {nbt.Age = 0-baby_time_value}
            if (baby_time == 's') {nbt.Age = 0-baby_time_value*20}
            if (baby_time == 'm') {nbt.Age = 0-baby_time_value*1200}
            if (baby_time == 'h') {nbt.Age = 0-baby_time_value*72000}
            $('.baby_living_mobs').removeClass('hide');
        }
    }

    }
    // EQUIPMENT //
    // armor //
    var armor_items = [];
    if (feet) {armor_items.push({id: feet,  Count: feet_n });} else {armor_items.push({});}
    if (legs) {armor_items.push({id: legs,  Count: legs_n });} else {armor_items.push({});}
    if (chest){armor_items.push({id: chest, Count: chest_n});} else {armor_items.push({});}
    if (head) {armor_items.push({id: head,  Count: head_n });} else {armor_items.push({});}
    if (head || chest || legs || feet) {
        nbt.ArmorItems = armor_items;
        var armor_drop_chances;
        if (head_c || chest_c || legs_c || feet_c) {
            if (!head_c) {head_c = 100;}
            if (!chest_c){chest_c= 100;}
            if (!legs_c) {legs_c = 100;}
            if (!feet_c) {feet_c = 100;}
            armor_drop_chances = [feet_c/100+'f', legs_c/100+'f', chest_c/100+'f', head_c/100+'f'];
            nbt.ArmorDropChances = armor_drop_chances;
        }
    }

    // held //
    var held_items = [];
    if (mainhand) {held_items.push({id: mainhand, Count: mainhand_n});} else {held_items.push({});}
    if (offhand) {held_items.push({id: offhand, Count: offhand_n});} else {held_items.push({});}
    if (mainhand || offhand) {
        nbt.HandItems = held_items;
        var hand_drop_chances;
        if (mainhand_c || offhand_c) {
            if (!mainhand_c) {mainhand_c = 100;}
            if (!offhand_c)  {offhand_c  = 100;}
            hand_drop_chances = [mainhand_c/100+'f', offhand_c/100+'f'];
            nbt.HandDropChances = hand_drop_chances;
        }
    }

    // CONVERT TO NBT //
    if (!isEmpty(nbt)) { //                   Removes quotes on IDs            Show int types as plain ints
        var NBT = JSON.stringify(nbt).replace(/"([^(")\\]+)":/g,'$1:').replace(/"([0-9.]+[bdfLs])"/g, '$1');
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
        alert(error + error.stack);
    }
    finally {
        summon();
    }
}

/* Copyright 2019 Nixinova */
