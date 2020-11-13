/// SUBMIT ///

function summon() {

    /// VARIABLES ///
    const zombies = ['drowned', 'husk', 'zombie', 'zombie_pigman', 'zombie_villager'];
    const neg_age_mobs = [
        'bee', 'cat', 'chicken', 'cow', 'fox', 'llama', 'mooshroom', 'rabbit', 'ocelot',
        'panda', 'pig', 'polar_bear', 'sheep', 'villager', 'wolf',
        'horse', 'donkey', 'mule', 'skeleton_horse', 'zombie_horse'
    ];
    const tame_mobs = ['llama', 'horse', 'donkey', 'mule', 'skeleton_horse', 'zombie_horse'];
    const owned_mobs = ['wolf', 'cat'];

    // call from input form //
    var entity = value('input_entity').toLowerCase().replace(/ /g, '_');
    var X = value('input_x').match(/^[~^]?-?[0-9]*\.?[0-9]+$/);
    var Y = value('input_y').match(/^[~^]?-?[0-9]*\.?[0-9]+$/);
    var Z = value('input_z').match(/^[~^]?-?[0-9]*\.?[0-9]+$/);
    var name = value('input_customname').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    var name_color = value('input_customname_color').toLowerCase().replace(/ /g, '_');
    var name_bold = hasClass('input_customname_b', 'on');
    var name_italic = hasClass('input_customname_i', 'on');
    var name_underline = hasClass('input_customname_u', 'on');
    var name_strike = hasClass('input_customname_s', 'on');
    var name_obfus = hasClass('input_customname_o', 'on');

    var name_visible = hasClass('input_customname_visible', 'on');
    var health = value('input_health', 'num');
    var no_ai = hasClass('input_no_ai', 'on');
    var despawnable = hasClass('input_despawnable', 'on');
    var invulnerable = hasClass('input_invulnerable', 'on');
    var silent = hasClass('input_silent', 'on');
    var pickup = hasClass('input_pickup', 'on');
    var gravity = hasClass('input_gravity', 'off');
    var glowing = hasClass('input_glowing', 'on');
    var lefthanded = hasClass('input_main_hand', 'left');

    var baby = hasClass('input_is_baby', 'on');
    var baby_time = value('input_baby_time');
    var baby_time_value = value('input_baby_time_value');
    var bee_stung = hasClass('input_bee_stung', 'on');
    var bee_nectar = hasClass('input_bee_nectar', 'on');
    var bee_angry = hasClass('input_bee_angry', 'on');
    var bee_angry_time = value('input_bee_angry_time');
    var bee_angry_time_value = value('input_bee_angry_time_value');
    var cat_type = value('input_cat_type', 'int')
    var cat_collar = value('input_cat_collar', 'int')
    var creeper_powered = hasClass('input_creeper_powered', 'on');
    var creeper_radius = value('input_creeper_radius', 'int')
    var creeper_fuse = value('input_creeper_fuse', 'int')
    var creeper_ignited = hasClass('input_creeper_ignited', 'on');
    var endermite_life = value('input_endermite_life', 'int')
    var endermite_attackable = hasClass('input_endermite_attackable', 'off');
    var enderdragon_state = value('input_enderdragon_state', 'int')
    var $fox_type = $('#input_fox_type');
    var ghast_explosion_power = value('input_ghast_explosion_power');
    var llama_type = value('input_llama_type', 'int')
    var llama_carpet = value('input_llama_carpet').toLowerCase().replace(/ /g, '_');
    var llama_temper = value('input_llama_temper', 'int')
    var horse_tame = hasClass('input_horse_tame', 'on');
    var mob_color = value('input_mob_color', 'int');
    var mooshroom_type = cleanup(value('input_mooshroom_type'))
    var owner = value('input_owner_uuid');
    var panda_dominant_gene = cleanup(value('input_panda_gene_1'));
    var panda_recessive_gene = cleanup(value('input_panda_gene_2'));
    var piglin_zombifies = hasClass('input_piglin_zombify', 'off');
    var rabbit_type = value('input_rabbit_type', 'int');
    var slime_size = value('input_slime_size', 'int');
    var strider_saddled = hasClass('input_strider_saddle', 'on');
    var tropical_fish_size = value('input_tropical_fish_size', 'int');
    var tropical_fish_pattern = value('input_tropical_fish_pattern', 'int');
    var tropical_fish_base_color = value('input_tropical_fish_base_color', 'int');
    var tropical_fish_pattern_color = value('input_tropical_fish_pattern_color', 'int');
    var villager_type = cleanup(value('input_villager_type'));
    var villager_profession = cleanup(value('input_villager_profession'));
    var villager_level = value('input_villager_level', 'int');
    var wolf_collar = value('input_wolf_collar', 'int');
    var wolf_sitting = hasClass('wolf_sitting', 'on');
    var zombies_canbreak_doors = hasClass('input_zombies_canbreak_doors', 'on');

    var head = cleanup(value('input_armour_head'));
    var chest = cleanup(value('input_armour_chest'));
    var legs = cleanup(value('input_armour_legs'));
    var feet = cleanup(value('input_armour_feet'));
    var head_n = value('input_armour_head_num', 'int');
    var chest_n = value('input_armour_chest_num', 'int');
    var legs_n = value('input_armour_legs_num', 'int');
    var feet_n = value('input_armour_feet_num', 'int');
    var head_c = value('input_armour_head_count', 'num');
    var chest_c = value('input_armour_chest_count', 'num');
    var legs_c = value('input_armour_legs_count', 'num');
    var feet_c = value('input_armour_feet_count', 'num');

    var mainhand = cleanup(value('input_held_item'));
    var mainhand_n = value('input_held_item_num', 'int');
    var mainhand_c = value('input_held_item_count', 'num');
    var offhand = cleanup(value('input_offhand_item'));
    var offhand_n = value('input_offhand_item_num', 'int');
    var offhand_c = value('input_offhand_item_count', 'num');

    var nbt = {}

    /// GENERATOR ///
    // OUTPUT //
    $('#generator-output').empty();
    $('#cmd-note').addClass('hide');
    $('.only').addClass('hide');
    $('.' + entity).removeClass('hide');

    // COORDS //
    if (!X) X = '~';
    if (!Y) Y = '~';
    if (!Z) Z = '~';

    // ENTITY NBT //
    {
        // all //
        let CustomName = {};
        let $preview = $('#preview-text');
        if (name) {
            $('#customname_color').removeClass('hide');
            JSON.stringify(name_color ? { "text": name, "color": name_color } : name);

            $('#preview, #expand-cname, #preview-text').removeClass('hide');
            $preview.removeClass().html(name.replace(/\\\\/g, '\\').replace(/\\"/g, '"'));
            CustomName.text = name;

            let className;
            const name_colors = {
                'black'        : "§0",
                'blue'         : "§9",
                'dark_aqua'    : "§3",
                'dark_blue'    : "§1",
                'dark_gray'    : "§8",
                'dark_green'   : "§2",
                'dark_purple'  : "§5",
                'dark_red'     : "§4",
                'gold'         : "§6",
                'gray'         : "§7",
                'green'        : "§a",
                'aqua'         : "§b",
                'red'          : "§c",
                'light_purple' : "§d",
                'yellow'       : "§e",
                'default'      : "§f",
            }
            className = name_colors[name_color || 'default'];

            if (name_color) { CustomName.color = name_color; }
            $preview.addClass(className);

            if (name_bold) {
                CustomName.bold = true;
                $preview.css('font-weight', 'bold');
            } else {
                $preview.css('font-weight', 'inherit');
            }

            if (!name_italic) {
                CustomName.italic = false;
                $preview.css('font-style', 'inherit');
            } else {
                $preview.css('font-style', 'italic');
            }

            if (name_underline) {
                CustomName.underlined = true;
                $preview.css('text-decoration', 'underline');
            } else if (!name_strike) {
                $preview.css('text-decoration', 'inherit');
            }

            if (name_strike) {
                CustomName.strikethrough = true;
                $preview.css('text-decoration', 'line-through');
            } else if (!name_underline) {
                $preview.css('text-decoration', 'inherit');
            }

            if (name_strike && name_underline) {
                $preview.css('text-decoration', 'underline line-through');
            }

            if (name_obfus) {
                CustomName.obfuscated = true;
                $preview.html('#'.repeat(name.length));
            }

            nbt.CustomName = JSON.stringify(CustomName).replace(/\\{8}/g, '\\\\').replace(/\\{7}"/g, '\\"');
        } else {
            $('#customname_color').addClass('hide');
            $preview.addClass('hide');
            $('#expand-cname').addClass('hide');
        }

        if (name_visible) nbt.CustomNameVisible = true;
        if (health) nbt.AbsorptionAmount = health;
        if (!no_ai) nbt.NoAI = true;
        if (!despawnable) nbt.PersistenceRequired = true;
        if (invulnerable) nbt.Invulnerable = true;
        if (silent) nbt.Silent = true;
        if (pickup) nbt.CanPickUpLoot = true;
        if (gravity) nbt.NoGravity = true;
        if (glowing) nbt.Glowing = true;
        if (lefthanded) nbt.LeftHanded = true;

        // tame mobs //
        if (tame_mobs.includes(entity)) {
            $('.tame_mobs.only').removeClass('hide');
            if (owner) nbt.Owner = owner;
        }

        // owned mobs //
        if (owned_mobs.includes(entity)) {
            $('.owned_mobs.only').removeClass('hide');
            if (horse_tame) nbt.Tame = true;
        }

        // bee //
        if (entity === 'bee') {
            if (bee_nectar) nbt.HasNectar = true;
            if (bee_stung) nbt.HasStung = true;

            if (bee_angry) {
                $('.angry-bee').removeClass('hide');
                if (bee_angry_time && bee_angry_time_value) {
                    /**/ if (bee_angry_time === 't') nbt.Anger = 0 - bee_angry_time_value;
                    else if (bee_angry_time === 's') nbt.Anger = 0 - bee_angry_time_value * 20;
                    else if (bee_angry_time === 'm') nbt.Anger = 0 - bee_angry_time_value * 1200;
                    else if (bee_angry_time === 'h') nbt.Anger = 0 - bee_angry_time_value * 72000;
                }
            }
        }

        // cat //
        if (entity === 'cat') {
            if (cat_type !== null) nbt.CatType = cat_type;
            if (cat_collar) nbt.CollarColor = cat_collar;
        }

        // coloured mobs //
        if (entity === 'sheep' || entity === 'shulker') {
            if (mob_color) nbt.Color = mob_color;
        }

        // creeper //
        if (entity === 'creeper') {
            if (creeper_powered) nbt.powered = true;
            if (creeper_ignited) nbt.ignited = true;
            if (creeper_radius && creeper_radius !== 3) nbt.ExplosionRadius = creeper_radius;
            if (creeper_fuse && creeper_fuse !== 30) nbt.Fuse = creeper_fuse;
        }

        // endermite //
        if (entity === 'endermite') {
            if (endermite_life) nbt.Lifetime = 2400 - endermite_life;
            if (endermite_attackable) nbt.PlayerSpawned = true;
        }

        // ender_dragon //
        if (entity === 'ender_dragon') {
            if (enderdragon_state !== 10) nbt.DragonPhase = enderdragon_state;
        }

        // fox //
        if (entity === 'fox') {
            if ($fox_type.hasClass('red') && foxCount > 0) nbt.Type = 'red';
            if ($fox_type.hasClass('snow')) nbt.Type = 'snow';
        }

        // ghast //
        if (entity === 'ghast') {
            if (ghast_explosion_power) nbt.ExplosionPower = ghast_explosion_power;
        }

        // llama //
        if (entity === 'llama') {
            if (llama_type) nbt.Variant = llama_type;
            if (llama_carpet) nbt.DecorItem = { id: llama_carpet + "_carpet", Count: 1 };
            if (llama_temper) nbt.Temper = llama_temper;
        }

        // mooshroom //
        if (entity === 'mooshroom') {
            if (mooshroom_type) nbt.Type = mooshroom_type;
        }

        // panda //
        if (entity === 'panda') {
            if (panda_dominant_gene) nbt.MainGene = panda_dominant_gene;
            if (panda_recessive_gene) nbt.HiddenGene = panda_recessive_gene;
        }

        // piglin //
        if (entity === 'piglin') {
            if (piglin_zombifies) nbt.IsImmuneToZombification = true;
        }

        // rabbit //
        if (entity === 'rabbit') {
            if (rabbit_type !== null) nbt.RabbitType = rabbit_type;
        }

        // slime //
        if (entity === 'slime') {
            if (slime_size !== null) nbt.Size = slime_size;
        }

        // strider //
        if (entity === 'strider') {
            if (strider_saddled !== null) nbt.Saddle = strider_saddled;
        }

        // tropical fish //
        if (entity === 'tropical_fish') {
            if (tropical_fish_size === 0) $('.large-fish').addClass('hide'); $('.small-fish').removeClass('hide');
            if (tropical_fish_size === 1) $('.small-fish').addClass('hide'); $('.large-fish').removeClass('hide');
            let byte1 = tropical_fish_size;
            let byte2 = tropical_fish_pattern * 2 ** 8;
            let byte3 = tropical_fish_base_color * 2 ** 16;
            let byte4 = tropical_fish_pattern_color * 2 ** 24;
            nbt.Variant = byte1 + byte2 + byte3 + byte4;
        }

        // villager //
        if (entity === 'villager' || entity === 'zombie_villager') {
            let villager_data = {};
            if (villager_type) villager_data.type = villager_type;
            if (villager_profession) villager_data.profession = villager_profession;
            if (villager_level && villager_level !== 1) villager_data.level = villager_level;
            if (!$.isEmptyObject(villager_data)) nbt.VillagerData = villager_data;
        }

        // wolf //
        if (entity === 'wolf') {
            if (wolf_collar) nbt.CollarColor = wolf_collar;
            if (wolf_sitting) nbt.Sitting = wolf_sitting;
        }

        // zombies //
        if (zombies.indexOf(entity) > -1) {
            $('.zombies').removeClass('hide');
            if (zombies_canbreak_doors) nbt.CanBreakDoors = true;
        }

        // babies //
        if (zombies.indexOf(entity) > -1) {
            $('.baby_mobs').removeClass('hide');
            if (baby) nbt.IsBaby = true;
        }
        if (neg_age_mobs.indexOf(entity) > -1) {
            $('.baby_mobs').removeClass('hide');
            if (baby && baby_time_value) {
                /**/ if (baby_time === 't') nbt.Age = 0 - baby_time_value;
                else if (baby_time === 's') nbt.Age = 0 - baby_time_value * 20;
                else if (baby_time === 'm') nbt.Age = 0 - baby_time_value * 1200;
                else if (baby_time === 'h') nbt.Age = 0 - baby_time_value * 72000;
                $('.baby_living_mobs').removeClass('hide');
            }
        }

    }
    // EQUIPMENT //
    // armor //
    let armor_items = [];
    if (feet) { armor_items.push({ id: feet, Count: feet_n }); } else { armor_items.push({}); }
    if (legs) { armor_items.push({ id: legs, Count: legs_n }); } else { armor_items.push({}); }
    if (chest) { armor_items.push({ id: chest, Count: chest_n }); } else { armor_items.push({}); }
    if (head) { armor_items.push({ id: head, Count: head_n }); } else { armor_items.push({}); }
    if (head || chest || legs || feet) {
        nbt.ArmorItems = armor_items;
        if (head_c || chest_c || legs_c || feet_c) {
            head_c = head_c ? head_c / 100 + 'f' : '0f';
            chest_c = chest_c ? chest_c / 100 + 'f' : '0f';
            legs_c = legs_c ? legs_c / 100 + 'f' : '0f';
            feet_c = feet_c ? feet_c / 100 + 'f' : '0f';
            nbt.ArmorDropChances = [feet_c, legs_c, chest_c, head_c];
        }
    }

    // held //
    var held_items = [];
    held_items.push(mainhand ? { id: mainhand, Count: mainhand_n } : {});
    held_items.push(offhand ? { id: offhand, Count: offhand_n } : {});
    if (mainhand || offhand) {
        nbt.HandItems = held_items;
        if (mainhand_c || offhand_c) {
            mainhand_c = mainhand_c ? mainhand_c / 100 + 'f' : '0f';
            offhand_c = offhand_c ? offhand_c / 100 + 'f' : '0f';
            nbt.HandDropChances = [mainhand_c, offhand_c];
        }
    }

    // CONVERT TO NBT //
    if (!isEmpty(nbt)) {//                Removes quotes from tags ;//         Show num types as ints
        nbt = JSON.stringify(nbt).replace(/"([^(")\\]+)":/g, '$1:');//.replace(/"([0-9.]+[bdfLs])"/g, '$1');
    } else nbt = '';

    /// OUTPUT ///
    window.Output = `/summon ${entity} ${X} ${Y} ${Z} ${nbt}`;
    if (window.Output.length > 256) {
        $('#cmd-note').removeClass('hide');
    }
    $('#generator-output').append(`
        <span class="§7">/summon</span>
        <span class="§b">${entity}</span>
        <span class="§e">${X} ${Y} ${Z}</span>
        <span class="§a">${nbt}</span>
    `);

    // counter //
    ++function_count;
}

function submit() {
    try {
        summon();
    }
    catch (error) {
        $('#generator-output').html("An unknown error has occurred. Please try again or reload the page.");
        console.error(error.stack);
    }
}

/* Copyright © Nixinova 2020 */