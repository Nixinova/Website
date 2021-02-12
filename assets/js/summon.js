/// SUBMIT ///

function summon() {

    /// VARIABLES ///
    const ZOMBIES = ['drowned', 'husk', 'zombie', 'zombie_pigman', 'zombie_villager'];
    const BABY_MOBS = [...ZOMBIES, 'piglin', 'zoglin'];
    const NEG_AGE_MOBS = [
        'bee', 'cat', 'chicken', 'cow', 'fox', 'llama', 'mooshroom', 'rabbit', 'ocelot',
        'panda', 'pig', 'polar_bear', 'sheep', 'villager', 'wolf',
        'horse', 'donkey', 'mule', 'skeleton_horse', 'zombie_horse'
    ];
    const TAME_MOBS = ['llama', 'horse', 'donkey', 'mule', 'skeleton_horse', 'zombie_horse'];
    const OWNED_MOBS = ['wolf', 'cat'];
    const named_colors = {
        'black': "§0",
        'blue': "§9",
        'dark_aqua': "§3",
        'dark_blue': "§1",
        'dark_gray': "§8",
        'dark_green': "§2",
        'dark_purple': "§5",
        'dark_red': "§4",
        'gold': "§6",
        'gray': "§7",
        'green': "§a",
        'aqua': "§b",
        'red': "§c",
        'light_purple': "§d",
        'yellow': "§e",
        'default': "§f",
    }

    // call from input form //
    let entity = value('input_entity').toLowerCase().replace(/ /g, '_');
    let X = value('input_x').match(/^[~^]?-?[0-9]*\.?[0-9]+$/);
    let Y = value('input_y').match(/^[~^]?-?[0-9]*\.?[0-9]+$/);
    let Z = value('input_z').match(/^[~^]?-?[0-9]*\.?[0-9]+$/);
    let name = value('input_customname').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    let name_color = value('input_customname_color').toLowerCase().replace(/ /g, '_');
    let name_bold = hasClass('input_customname_b', 'on');
    let name_italic = hasClass('input_customname_i', 'on');
    let name_underline = hasClass('input_customname_u', 'on');
    let name_strike = hasClass('input_customname_s', 'on');
    let name_obfus = hasClass('input_customname_o', 'on');

    let name_visible = hasClass('input_customname_visible', 'on');
    let health = value('input_health', 'num');
    let no_ai = hasClass('input_no_ai', 'on');
    let despawnable = hasClass('input_despawnable', 'on');
    let invulnerable = hasClass('input_invulnerable', 'on');
    let silent = hasClass('input_silent', 'on');
    let pickup = hasClass('input_pickup', 'on');
    let gravity = hasClass('input_gravity', 'off');
    let glowing = hasClass('input_glowing', 'on');
    let lefthanded = hasClass('input_main_hand', 'left');

    let axolotl_variant = value('input_axolotl_variant', 'int');
    let baby = hasClass('input_is_baby', 'on');
    let baby_time = value('input_baby_time');
    let baby_time_value = value('input_baby_time_value');
    let bee_stung = hasClass('input_bee_stung', 'on');
    let bee_nectar = hasClass('input_bee_nectar', 'on');
    let bee_angry = hasClass('input_bee_angry', 'on');
    let bee_angry_time = value('input_bee_angry_time');
    let bee_angry_time_value = value('input_bee_angry_time_value');
    let cat_type = value('input_cat_type', 'int')
    let cat_collar = value('input_cat_collar', 'int')
    let creeper_powered = hasClass('input_creeper_powered', 'on');
    let creeper_radius = value('input_creeper_radius', 'int')
    let creeper_fuse = value('input_creeper_fuse', 'int')
    let creeper_ignited = hasClass('input_creeper_ignited', 'on');
    let endermite_life = value('input_endermite_life', 'int')
    let endermite_attackable = hasClass('input_endermite_attackable', 'off');
    let enderdragon_state = value('input_enderdragon_state', 'int')
    let ghast_explosion_power = value('input_ghast_explosion_power', 'int');
    let glow_squid_timer = value('input_glow_squid_timer', 'int')
    let llama_type = value('input_llama_type', 'int')
    let llama_carpet = value('input_llama_carpet').toLowerCase().replace(/ /g, '_');
    let llama_temper = value('input_llama_temper', 'int')
    let horse_tame = hasClass('input_horse_tame', 'on');
    let mob_color = value('input_mob_color', 'int');
    let mooshroom_type = cleanup(value('input_mooshroom_type'))
    let owner = value('input_owner_uuid');
    let panda_dominant_gene = cleanup(value('input_panda_gene_1'));
    let panda_recessive_gene = cleanup(value('input_panda_gene_2'));
    let piglin_zombifies = hasClass('input_piglin_zombify', 'off');
    let piglin_age = value('input_piglin_age', 'int');
    let piglin_hunting = hasClass('input_piglin_hunting', 'off');
    let hoglin_hunted = hasClass('input_hoglin_hunted', 'off');
    let rabbit_type = value('input_rabbit_type', 'int');
    let slime_size = value('input_slime_size', 'int');
    let strider_saddled = hasClass('input_strider_saddle', 'on');
    let tropical_fish_size = value('input_tropical_fish_size', 'int');
    let tropical_fish_pattern = value('input_tropical_fish_pattern', 'int');
    let tropical_fish_base_color = value('input_tropical_fish_base_color', 'int');
    let tropical_fish_pattern_color = value('input_tropical_fish_pattern_color', 'int');
    let villager_type = cleanup(value('input_villager_type'));
    let villager_profession = cleanup(value('input_villager_profession'));
    let villager_level = value('input_villager_level', 'int');
    let wolf_collar = value('input_wolf_collar', 'int');
    let wolf_sitting = hasClass('wolf_sitting', 'on');
    let zombies_canbreak_doors = hasClass('input_zombies_canbreak_doors', 'on');

    let head = cleanup(value('input_armour_head'));
    let chest = cleanup(value('input_armour_chest'));
    let legs = cleanup(value('input_armour_legs'));
    let feet = cleanup(value('input_armour_feet'));
    let head_n = value('input_armour_head_num', 'int');
    let chest_n = value('input_armour_chest_num', 'int');
    let legs_n = value('input_armour_legs_num', 'int');
    let feet_n = value('input_armour_feet_num', 'int');
    let head_c = value('input_armour_head_count', 'num');
    let chest_c = value('input_armour_chest_count', 'num');
    let legs_c = value('input_armour_legs_count', 'num');
    let feet_c = value('input_armour_feet_count', 'num');

    let mainhand = cleanup(value('input_held_item'));
    let mainhand_n = value('input_held_item_num', 'int');
    let mainhand_c = value('input_held_item_count', 'num');
    let offhand = cleanup(value('input_offhand_item'));
    let offhand_n = value('input_offhand_item_num', 'int');
    let offhand_c = value('input_offhand_item_count', 'num');

    let nbt = {}

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

            if (name_color) CustomName.color = name_color;
            $preview.addClass(named_colors[name_color || 'default']);

            if (name_bold) CustomName.bold = true;
            $preview.css('font-weight', name_bold ? 'bold' : 'inherit');

            if (!name_italic) CustomName.italic = false;
            $preview.css('font-style', name_italic ? 'italic' : 'inherit');

            if (name_underline) CustomName.underlined = true;
            if (!name_strike) $preview.css('text-decoration', name_underline ? 'underline' : 'inherit');

            if (name_strike) CustomName.strikethrough = true;
            if (!name_underline) $preview.css('text-decoration', name_strike ? 'line-through' : 'inherit');

            if (name_strike && name_underline) $preview.css('text-decoration', 'underline line-through');

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
        if (TAME_MOBS.includes(entity)) {
            $('.tame_mobs.only').removeClass('hide');
            if (owner) nbt.Owner = owner;
        }

        // owned mobs //
        if (OWNED_MOBS.includes(entity)) {
            $('.owned_mobs.only').removeClass('hide');
            if (horse_tame) nbt.Tame = true;
        }

        // axolotl //
        if (entity === 'axolotl') {
            if (axolotl_variant + 0) nbt.Variant = axolotl_variant;
        }

        // bee //
        if (entity === 'bee') {
            if (bee_nectar) nbt.HasNectar = true;
            if (bee_stung) nbt.HasStung = true;

            if (bee_angry) {
                $('.angry-bee').removeClass('hide');
                if (bee_angry_time && bee_angry_time_value) {
                    let interval = 1;
                    switch (bee_angry_time) { // fallthrough
                        case 'h': interval *= 60;
                        case 'm': interval *= 60;
                        case 's': interval *= 20;
                    }
                    nbt.Anger = 0 - bee_angry_time_value * interval;
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
        let $fox_type = $('#input_fox_type');
        if (entity === 'fox') {
            if ($fox_type.hasClass('red') && $fox_type.data('clicked')) nbt.Type = 'red';
            if ($fox_type.hasClass('snow')) nbt.Type = 'snow';
        }

        // ghast //
        if (entity === 'ghast') {
            if (ghast_explosion_power) nbt.ExplosionPower = ghast_explosion_power;
        }

        // glow_squid //
        if (entity === 'glow_squid') {
            if (glow_squid_timer) nbt.DarkTicksRemaining = glow_squid_timer;
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

        // piglin and hoglin //
        if (entity === 'piglin' || entity === 'hoglin') {
            if (piglin_zombifies) nbt.IsImmuneToZombification = true;
            if (piglin_age) nbt.TimeInOverworld = 300 - piglin_age;
            if (piglin_hunting) nbt.CannotHunt = true;
            if (hoglin_hunted) nbt.CannotBeHunted = true;
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
            if (tropical_fish_size === 0) {
                $('.large-fish').addClass('hide');
                $('.small-fish').removeClass('hide');
            }
            else if (tropical_fish_size === 1) {
                $('.small-fish').addClass('hide');
                $('.large-fish').removeClass('hide');
            }
            let variant = tropical_fish_size;
            variant += tropical_fish_pattern * 2 ** 8;
            variant += tropical_fish_base_color * 2 ** 16;
            variant += tropical_fish_pattern_color * 2 ** 24;
            nbt.Variant = variant;
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
        if (ZOMBIES.indexOf(entity) > -1) {
            $('.zombies').removeClass('hide');
            if (zombies_canbreak_doors) nbt.CanBreakDoors = true;
        }

        // babies //
        if (BABY_MOBS.indexOf(entity) > -1) {
            $('.baby_mobs').removeClass('hide');
            if (baby) nbt.IsBaby = true;
        }
        if (NEG_AGE_MOBS.indexOf(entity) > -1) {
            $('.baby_mobs').removeClass('hide');
            if (baby && baby_time_value) {
                let interval = 1;
                switch (baby_time) { // fallthrough
                    case 'h': interval *= 60;
                    case 'm': interval *= 60;
                    case 's': interval *= 20;
                }
                nbt.Age = 0 - baby_time_value * interval;
                $('.baby_living_mobs').removeClass('hide');
            }
        }

    }
    // EQUIPMENT //
    // armor //
    let armor_items = [];
    armor_items.push(feet ? { id: feet, Count: feet_n } : {});
    armor_items.push(legs ? { id: legs, Count: legs_n } : {});
    armor_items.push(chest ? { id: chest, Count: chest_n } : {});
    armor_items.push(head ? { id: head, Count: head_n } : {});
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
    let held_items = [];
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

/* Copyright © Nixinova 2021 */
