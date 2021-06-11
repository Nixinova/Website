/// SUBMIT ///

function give() {
    /// LISTS ///
    const TAGS = [
        "acacia_logs", "anvil", "bamboo_plantable_on", "banners", "base_stone_nether", "base_stone_overworld", "beacon_base_blocks", "beds", "bee_growables", "beehives", "birch_logs", "buttons", "campfires", "candle_cakes", "candles", "carpets", "cauldrons", "cave_vines", "climbable", "coal_ores", "copper_ores", "coral_blocks", "corals", "crops", "crystal_sound_block", "dark_oak_logs", "deepslate_ore_replaceables", "diamond_ores", "dirt", "dirt_like", "doors", "dragon_immune", "dripstone_replaceable_blocks", "emerald_ores", "enderman_holdable", "features_cannot_replace", "fence_gates", "fences", "flower_pots", "flowers", "geode_invalid_blocks", "gold_ores", "guarded_by_piglins", "hoglin_repellents", "ice", "impermeable", "infiniburn_end", "infiniburn_nether", "infiniburn_overworld", "inside_step_sound_block", "iron_ores", "jungle_logs", "lapis_ores", "lava_pool_stone_replaceable", "leaves", "logs", "logs_that_burn", "lush_ground_replaceable", "mineable/axe", "mineable/hoe", "mineable/pickaxe", "mineable/shovel", "moss_replaceable", "mushroom_grow_block", "needs_diamond_tool", "needs_iron_tool", "needs_stone_tool", "non_flammable_wood", "oak_logs", "occludes_vibration_signals", "piglin_repellents", "planks", "pressure_plates", "prevent_mob_spawning_inside", "rails", "redstone_ores", "sand", "saplings", "signs", "slabs", "small_dripleaf_placeable", "small_flowers", "snow", "soul_fire_base_blocks", "soul_speed_blocks", "spruce_logs", "stairs", "standing_signs", "stone_bricks", "stone_ore_replaceables", "stone_pressure_plates", "strider_warm_blocks", "tall_flowers", "unstable_bottom_center", "valid_spawn", "wall_corals", "wall_post_override", "wall_signs", "walls", "wither_immune", "wither_summon_base_blocks", "wooden_buttons", "wooden_doors", "wooden_fences", "wooden_pressure_plates", "wooden_slabs", "wooden_stairs", "wooden_trapdoors", "wool"
    ]; // as of 1.17
    const EXPLANATIONS = {
        bee_growables: "Crops and berry bushes",
        base_stone_nether: "Stone-like blocks in the Nether",
        base_stone_overworld: "Stone-like blocks in the Overworld",
        hoglin_repellents: "Warped fungi",
        impermeable: "Glass",
        piglin_repellents: "Soul fire",
        valid_spawn: "Grass and podzol",
        unstable_bottom_center: "Fence gates",
    };
    const DURABLE_ITEMS = [
        "netherite_sword", "netherite_pickaxe", "netherite_axe", "netherite_shovel", "netherite_hoe",
        "diamond_sword", "diamond_pickaxe", "diamond_axe", "diamond_shovel", "diamond_hoe",
        "iron_sword", "iron_pickaxe", "iron_axe", "iron_shovel", "iron_hoe",
        "golden_sword", "golden_pickaxe", "golden_axe", "golden_shovel", "golden_hoe",
        "stone_sword", "stone_pickaxe", "stone_axe", "stone_shovel", "stone_hoe",
        "wooden_sword", "wooden_pickaxe", "wooden_axe", "wooden_shovel", "wooden_hoe",

        "netherite_helmet", "netherite_chestplate", "netherite_leggings", "netherite_boots",
        "diamond_helmet", "diamond_chestplate", "diamond_leggings", "diamond_boots",
        "iron_helmet", "iron_chestplate", "iron_leggings", "iron_boots",
        "chainmail_helmet", "chainmail_chestplate", "chainmail_leggings", "chainmail_boots",
        "golden_helmet", "golden_chestplate", "golden_leggings", "golden_boots",
        "leather_helmet", "leather_chestplate", "leather_leggings", "leather_boots",

        "trident", "bow", "flint_and_steel", "elytra", "shield", "carrot_on_a_stick", "fishing_rod", "shears", "warped_fungus_on_a_stick"
    ];
    const DURABILITIES = {
        "netherite_sword": 2031, "netherite_pickaxe": 2031, "netherite_axe": 2031, "netherite_shovel": 2031, "netherite_hoe": 2031,
        "diamond_sword": 1561, "diamond_pickaxe": 1561, "diamond_axe": 1561, "diamond_shovel": 1561, "diamond_hoe": 1561,
        "iron_sword": 250, "iron_pickaxe": 250, "iron_axe": 250, "iron_shovel": 250, "iron_hoe": 250,
        "golden_sword": 32, "golden_pickaxe": 32, "golden_axe": 32, "golden_shovel": 32, "golden_hoe": 32,
        "stone_sword": 131, "stone_pickaxe": 131, "stone_axe": 131, "stone_shovel": 131, "stone_hoe": 131,
        "wooden_sword": 59, "wooden_pickaxe": 59, "wooden_axe": 59, "wooden_shovel": 59, "wooden_hoe": 59,

        "netherite_helmet": 408, "netherite_chestplate": 592, "netherite_leggings": 556, "netherite_boots": 482,
        "diamond_helmet": 364, "diamond_chestplate": 529, "diamond_leggings": 496, "diamond_boots": 430,
        "iron_helmet": 166, "iron_chestplate": 241, "iron_leggings": 226, "iron_boots": 196,
        "chainmail_helmet": 166, "chainmail_chestplate": 241, "chainmail_leggings": 226, "chainmail_boots": 196,
        "golden_helmet": 78, "golden_chestplate": 113, "golden_leggings": 106, "golden_boots": 92,
        "leather_helmet": 56, "leather_chestplate": 81, "leather_leggings": 76, "leather_boots": 66,

        "trident": 250, "bow": 384, "flint_and_steel": 63, "elytra": 431, "shield": 336,
        "carrot_on_a_stick": 225, "fishing_rod": 64, "shears": 237, "warped_fungus_on_a_stick": 100
    };
    const ATTRIBUTES = [
        "attack_damage", "armor", "armor_toughness", "attack_reach", "attack_speed", "follow_range", "knockback_resistance", "luck", "max_health", "movement_speed"
    ];

    /// VARIABLES ///

    // call from input form //
    let target = value('input_selector_target');
    let player = value('input_selector_player').replace(/[\ -]/g, "_").replace(/[^a-zA-Z0-9\_]/g, "");
    let target_x = value('input_selector_x', 'num');
    let target_y = value('input_selector_y', 'num');
    let target_z = value('input_selector_z', 'num');
    let dist_min = value('input_selector_dist_min', 'num');
    let dist_max = value('input_selector_dist_max', 'num');
    let selection_area = $('#input_selection_area').attr('class');
    let vol_x = value('input_selector_vol_x', 'num');
    let vol_y = value('input_selector_vol_y', 'num');
    let vol_z = value('input_selector_vol_z', 'num');
    let xrot_min = value('input_selector_xrot_min', 'num');
    let xrot_max = value('input_selector_xrot_max', 'num');
    let yrot_min = value('input_selector_yrot_min', 'num');
    let yrot_max = value('input_selector_yrot_max', 'num');
    let limit = value('input_selector_limit', 'int');
    let team = value('input_selector_team').toLowerCase().replace(/[\ -]/g, "_").replace(/[^a-z\_]/g, "");
    let team_invert = hasClass('input_selector_team_i', 'on');
    let tag = value('input_selector_tag').toLowerCase().replace(/[\ -]/g, "_").replace(/[^a-z\_]/g, "");
    let tag_invert = hasClass('input_selector_tag_i', 'on');
    let gamemode = value('input_selector_gm').toLowerCase();
    let gamemode_invert = hasClass('input_selector_gm_i', 'on');
    let xp_min = value('input_selector_xp_min', 'int');
    let xp_max = value('input_selector_xp_max', 'int');
    let score = value('input_selector_score_objective').toLowerCase().replace(/[^a-z_:]/g, "");
    let score_min = value('input_selector_score_min', 'int');
    let score_max = value('input_selector_score_max', 'int');

    let item = value('input_item').toLowerCase().replace(/[\ \-]/g, "_").replace(/[^a-z0-9_:]/g, "").replace(/_+/g, "_").replace(/:+/g, ":");
    let i_potion = value('input_item_potion').toLowerCase().replace(/[\ \-]/g, "_").replace(/[^a-z_:]/g, "").replace(/_+/g, "_");
    let i_head = value('input_item_head').replace(/[\ -]/g, "_").replace(/[^a-zA-Z0-9\_]/g, "");
    let i_firework_flicker = hasClass('input_item_firework_flicker', 'on');
    let i_firework_flight = value('input_item_firework_flight', 'int');
    let i_firework_type = value('input_item_firework_type', 'int');
    let i_firework_trail = hasClass('input_item_firework_trail', 'on');
    let i_name = value('input_item_name').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    let i_colour = value('input_item_colour').toLowerCase().replace(' ', '_');
    let i_bold = hasClass('input_item_b', 'on');
    let i_italic = hasClass('input_item_i', 'on');
    let i_underline = hasClass('input_item_u', 'on');
    let i_strike = hasClass('input_item_s', 'on');
    let i_obfus = hasClass('input_item_o', 'on');
    let i_lore = value('input_item_lore').replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
    let i_ench = value('input_item_ench').toLowerCase().replace(/ /g, '_');
    let i_ench_lvl = value('input_item_ench_lvl', 1);
    let i_unbreakable = hasClass('input_item_unbreakable', 'on');
    let i_durability = value('input_item_durability', 1);
    let i_destroy = value('input_item_destroy').toLowerCase().replace(/[ -]/g, "_").replace(/[^a-z_:#]/g, "").replace(/_+/g, "_").replace(/:+/g, ":");
    let i_place_on = value('input_item_place_on').toLowerCase().replace(/[ -]/g, "_").replace(/[^a-z_:]/g, "").replace(/_+/g, "_").replace(/:+/g, ":");
    let i_mod = value('input_item_mod').toLowerCase().replace(/ /g, "_");
    let i_mod_amount = value('input_item_mod_value', 'int');
    let i_mod_op = value('input_item_mod_operation', 'num');
    let i_mod_slot = value('input_item_mod_slot').toLowerCase().replace(/ /g, '');

    let count = value('input_count');

    // fix values //
    if (dist_max != null && dist_min > dist_max) [dist_min, dist_max] = [dist_max, dist_min];
    if (xrot_max != null && xrot_min > xrot_max) [xrot_min, xrot_max] = [xrot_max, xrot_min];
    if (yrot_max != null && yrot_min > yrot_max) [yrot_min, yrot_max] = [yrot_max, yrot_min];
    if (xp_max != null && xp_min > xp_max) [xp_min, xp_max] = [xp_max, xp_min];
    if (score_max != null && score_min > score_max) [score_min, score_max] = [score_max, score_min];

    // hideflags //
    let hf = 0;
    if ($('#ench').hasClass('off')) hf += 1;
    if ($('#mods').hasClass('off')) hf += 2;
    if ($('#unbr').hasClass('off')) hf += 4;
    if ($('#dstr').hasClass('off')) hf += 8;
    if ($('#plon').hasClass('off')) hf += 16;
    if ($('#othr').hasClass('off')) hf += 32;

    /// GENERATOR ///
    $('#generator-output').empty();
    $('#cmd-note').addClass('hide');

    // select player //
    $('.player_only').toggleClass('hide', target !== '@e');
    if (target === '--') {
        $('#select-username').removeClass('hide');
        $('#expand-target').addClass('hide');
        if ($('#expand-target').hasClass('minus')) {
            show_more('expand-target', 'target-content', false);
        }
    } else if (target === '@s') {
        $('#select-username').addClass('hide');
        $('#expand-target').addClass('hide');
        if ($('#expand-target').hasClass('minus')) {
            show_more('expand-target', 'target-content', false);
        }
    } else {
        $('#select-username').addClass('hide');
        $('#expand-target').removeClass('hide');
        $('#input_selector_player').val('');
    }

    let selector = [];
    let target_text = (target === '--') ? (player || '@s') : target;

    if (player) {
        selector = '';
    } else {
        if (target_x != null) selector.push('x=' + target_x);
        if (target_y != null) selector.push('y=' + target_y);
        if (target_z != null) selector.push('z=' + target_z);

        if (selection_area === 'radius' && (dist_min != null || dist_max != null)) {
            if (dist_min && !dist_max) selector.push('distance=' + dist_min + '..');
            if (!dist_min && dist_max) selector.push('distance=' + '..' + dist_max);
            if (dist_min && dist_max && dist_min != dist_max) selector.push('distance=' + dist_min + '..' + dist_max);
            if (dist_min && dist_max && dist_min === dist_max) selector.push('distance=' + dist_min);
        }

        if (selection_area === 'volume' && (vol_x != null || vol_y != null || vol_z != null)) {
            if (vol_x) selector.push('dx=' + vol_x);
            if (vol_y) selector.push('dy=' + vol_y);
            if (vol_z) selector.push('dz=' + vol_z);
        }

        if (xrot_min != null && xrot_max != null) {
            if (!isNaN(xrot_min) && isNaN(xrot_max)) selector.push('x_rotation=' + xrot_min + '..');
            if (isNaN(xrot_min) && !isNaN(xrot_max)) selector.push('x_rotation=' + '..' + xrot_max);
            if (!isNaN(xrot_min) && !isNaN(xrot_max) && xrot_min !== xrot_max) selector.push('x_rotation=' + xrot_min + '..' + xrot_max);
            if (!isNaN(xrot_min) && !isNaN(xrot_max) && xrot_min === xrot_max) selector.push('x_rotation=' + xrot_min);
        }

        if (yrot_min != null && yrot_max != null) {
            if (!isNaN(yrot_min) && isNaN(yrot_max)) selector.push('y_rotation=' + yrot_min + '..');
            if (isNaN(yrot_min) && !isNaN(yrot_max)) selector.push('y_rotation=' + '..' + yrot_max);
            if (!isNaN(yrot_min) && !isNaN(yrot_max) && yrot_min !== yrot_max) selector.push('y_rotation=' + yrot_min + '..' + yrot_max);
            if (!isNaN(yrot_min) && !isNaN(yrot_max) && yrot_min === yrot_max) selector.push('y_rotation=' + yrot_min);
        }

        if (limit != null) selector.push('limit=' + limit);

        if (team) selector.push('team=' + (team_invert ? '!' : '') + team);
        if (tag) selector.push('tag=' + (tag_invert ? '!' : '') + tag);
        if (gamemode) selector.push('gamemode=' + (gamemode_invert ? '!' : '') + gamemode);

        if (xp_min != null && xp_max != null) {
            if (!isNaN(xp_min) && isNaN(xp_max)) selector.push('level=' + xp_min + '..');
            else if (isNaN(xp_min) && !isNaN(xp_max)) selector.push('level=' + '..' + xp_max);
            else if (!isNaN(xp_min) && !isNaN(xp_max) && xp_min !== xp_max) selector.push('level=' + xp_min + '..' + xp_max);
            else if (!isNaN(xp_min) && !isNaN(xp_max) && xp_min === xp_max) selector.push('level=' + xp_min);
        }

        if (score != null && (score_min != null && score_max != null)) {
            scores.push(score);
            scores_min.push(score_min);
            scores_max.push(score_max);
            scores_min[scores.indexOf(score)] = score_min;
            scores_max[scores.indexOf(score)] = score_max;

            let new_scores = [], new_min = [], new_max = [];
            for (let a in scores) {
                if (new_scores.indexOf(scores[a]) === -1) {
                    new_scores.push(scores[a]);
                    new_min.push(scores_min[a]);
                    new_max.push(scores_max[a]);
                }
            }
            scores = new_scores, scores_min = new_min, scores_max = new_max;

            let score_text = [];
            for (let i in scores) {
                if (!scores[i]) continue;
                if (isNaN(scores_max[i]) && !isNaN(scores_min[i])) score_text.push(scores[i] + '=' + scores_min[i] + '..');
                else if (isNaN(scores_min[i]) && isNaN(scores_max[i])) score_text.push(scores[i] + '=' + '..' + scores_max[i]);
                else if (!isNaN(scores_min[i]) && !isNaN(scores_max[i]) && scores_min[i] != scores_max[i]) score_text.push(scores[i] + '=' + scores_min[i] + '..' + scores_max[i]);
                else if (!isNaN(scores_min[i]) && !isNaN(scores_max[i]) && scores_min[i] === scores_max[i]) score_text.push(scores[i] + '=' + scores_min[i]);
            }
            selector.push('scores={' + JSON.stringify(score_text).replace(/[\[\]]/g, '') + '}');
        }

        selector = selector.length > 0 ? JSON.stringify(selector).replace(/"/g, '').replace(/\\/g, '') : '';
    }

    // select item //
    let colon_pos = item.search(':');
    let item_id = item.replace('minecraft:', '');
    if (!item || item === 'minecraft:' || item === ':') item = 'minecraft:stone';
    else if (colon_pos === item.length - 1) item = 'minecraft:' + item.slice(0, -1);
    else if (colon_pos === -1) item = 'minecraft:' + item;
    else if (colon_pos === 0) item = 'minecraft' + item;

    // NBT //
    let nbt = {};

    // bundle //
    $('#bundle_info').remove();
    if (item_id.includes('bundle')) {
        $('#input_item').after(`<span id="bundle_info">&ensp;Try out the <a href="bundle">bundle creator</a>!</span>`);
    }

    // potion //
    if (item_id.includes('potion')) {
        $('#potion').removeClass('hide');
    } else {
        $('#potion').addClass('hide');
        $('input_item_potion').val('');
    }
    if (i_potion) nbt.Potion = i_potion;

    // head //
    if (item_id === 'player_head' || item_id === 'player_wall_head') {
        $('#player_head').removeClass('hide');
    } else {
        $('#player_head').addClass('hide');
        $('input_item_head').val('');
    }
    if (i_head) nbt.SkullOwner = i_head;

    // fireworks //
    $('#firework').toggleClass('hide', item_id !== 'firework_rocket');
    if (item === 'firework_rocket' && (i_firework_type || i_firework_trail || i_firework_flicker || i_firework_flight)) {
        nbt.Fireworks = {};
        if (i_firework_flight) nbt.Fireworks.Flight = i_firework_flight;
        let explosions = [{}];
        if (i_firework_type) explosions[0].Type = i_firework_type;
        if (i_firework_flicker) explosions[0].Flicker = i_firework_flicker;
        if (i_firework_trail) explosions[0].Trail = i_firework_trail;
        nbt.Fireworks = { "Explosions": explosions };
    }

    // display //
    if (i_name || i_lore) nbt.display = {};
    let display = {};

    if (i_name) {
        const $preview = $('#preview-text');
        $('#preview').removeClass('hide');
        $('#expand-cname').removeClass('hide');
        $preview.html(i_name.replace(/\\\\/g, '\\').replace(/\\"/g, '"'));
        display.text = i_name;
        window.previewText = i_name;

        let className = {
            'aqua': "§b",
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
            'light_purple': "§d",
            'red': "§c",
            'yellow': "§e",
            'white': "§f",
        }[i_colour || 'white'];

        if (i_colour) display.color = i_colour;
        $preview.removeClass().addClass(className);

        if (i_obfus) display.obfuscated = true;
        $preview.toggleClass('§k', i_obfus);

        if (i_bold) display.bold = true;
        $preview.toggleClass('§l', i_bold);

        if (i_strike) display.strikethrough = true;
        $preview.toggleClass('§m', i_strike);

        if (i_underline) display.underlined = true;
        $preview.toggleClass('§n', i_underline);

        if (!i_italic) display.italic = false;
        $preview.toggleClass('§o', i_italic);

        nbt.display.Name = JSON.stringify(display).replace(/\\{8}/g, '\\\\').replace(/\\{7}"/g, '\\"');
    } else {
        $('#preview').addClass('hide');
        $('#expand-cname').addClass('hide');
        $('#cname-content').addClass('hide');
    }

    // lore //
    if (i_lore) {
        let lore = i_lore.split('\n');
        for (let i in lore) lore[i] = '"' + lore[i] + '"';
        nbt.display.Lore = lore;
    }

    // enchantments //
    if (i_ench) {
        e.push(i_ench);
        elvl.push(i_ench_lvl);
        elvl[e.indexOf(i_ench)] = i_ench_lvl;

        let e2 = [], elvl2 = [];
        for (let i in e) {
            if (!e2.includes(e[i])) {
                e2.push(e[i]);
                elvl2.push(elvl[i]);
            }
        }
        e = e2, elvl = elvl2;

        nbt.Enchantments = [];
        for (let i in e) {
            if (e[i]) {
                nbt.Enchantments.push({ id: e[i], lvl: parseInt(elvl[i]) });
            }
        }
    }

    // tools & weapons items //
    if (DURABLE_ITEMS.includes(item_id)) {
        $('.tool').removeClass('hide');
    } else {
        $('.tool').addClass('hide');
        $('input_item_unbreakable').prop('checked', false);
        $('input_item_durability').val('');
    }

    // damage //
    let damage = DURABILITIES[item_id] - i_durability;
    if (i_durability && !i_unbreakable) nbt.Damage = damage;

    // unbreakable //
    if (i_unbreakable) nbt.Unbreakable = true;

    // tags
    $('#placeon-destroy-data').empty();
    for (const tag of TAGS) {
        $('#placeon-destroy-data').append(`\n\t<option value="${tag}">${EXPLANATIONS[tag] || ''}</option>`);
    }

    // CanDestroy //
    if (i_destroy) {
        CanDestroy.push(i_destroy);
        for (const i in CanDestroy) {
            for (const tag of TAGS) {
                if (CanDestroy[i] === tag) CanDestroy[i] = '#' + tag;
            }
        }
        nbt.CanDestroy = rvDupes(CanDestroy);
    }

    // CanPlaceOn //
    if (i_place_on) {
        CanPlaceOn.push(i_place_on);
        for (const i in CanPlaceOn) {
            for (const tag of TAGS) {
                if (CanPlaceOn[i] === tag) CanPlaceOn[i] = '#' + tag;
            }
        }
        nbt.CanPlaceOn = rvDupes(CanPlaceOn);
    }

    // modifiers //
    if (i_mod && i_mod_amount != null) {
        const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
        i_mod_amount = {
            'armor': clamp(i_mod_amount, 0, 30),
            'armor_toughness': clamp(i_mod_amount, 0, 20),
            'attack_damage': clamp(i_mod_amount, 0, 2048),
            'attack_speed': clamp(i_mod_amount, 0, 1024),
            'attack_range': clamp(i_mod_amount, 0, 6),
            'follow_range': clamp(i_mod_amount, 0, 2048),
            'knockback_resistance': clamp(i_mod_amount, 0, 1),
            'luck': clamp(i_mod_amount, -1024, 1024),
            'max_health': clamp(i_mod_amount, 0, 1024),
            'movement_speed': clamp(i_mod_amount, 0, 1024),
        }[i_mod];

        const uuid = () => random(-1000, 1000);
        for (let i in ATTRIBUTES) {
            if (!Uuids[ATTRIBUTES[i]]) Uuids[ATTRIBUTES[i]] = [uuid(), uuid(), uuid(), uuid()];
        }

        for (let i in Modifiers) {
            if (Modifiers[i].AttributeName === 'generic.' + i_mod) {
                Modifiers.splice(i, 1);
            }
        }

        const uuids = Uuids[i_mod];
        Modifiers.push({
            AttributeName: 'generic.' + i_mod, Name: 'generic.' + i_mod,
            Amount: i_mod_amount, Operation: i_mod_op,
            UUID: ['I;', uuids[0], uuids[1], uuids[2], uuids[3]]
        });
        if (i_mod_slot) Modifiers[Modifiers.length - 1].Slot = i_mod_slot;

        nbt.AttributeModifiers = rvNestedDupes(Modifiers);
    }

    // hide flags //
    if (hf > 0) nbt.HideFlags = hf;

    // nbt //
    if (!isEmpty(nbt)) {
        //                                Remove quotes from tags          Allow section symbol            Format typed arrays
        nbt = JSON.stringify(nbt).replace(/"([^(")\\]+)":/g, '$1:').replace(/§/g, '\\\\u00A7').replace('UUID:["I;",', 'UUID:[I;');
    } else nbt = '';

    // count //
    if (!count) count = '1';

    /// OUTPUT ///
    window.Output = `/give ${target_text + selector} ${item + nbt} ${count}`;
    if (Output.length > 255) {
        $('#cmd-note').removeClass('hide');
        if (target_text === '@s') {
            target_text = '@p';
            $('#input_selector_target').val('@p');
        }
    }

    $('#generator-output').html(`
        <span class="§7">/give</span>
        <span class="§b">${target_text + selector}</span>
        <span class="§e">${item}<span>${nbt.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>
        <span class="§a">${count}</span>
    `);

}

function submit() {
    try {
        give();
    }
    catch (error) {
        $('#generator-output').html("An unknown error has occurred. Please try again or reload the page.");
        console.error(error.stack);
    }
}

/* Copyright © Nixinova 2021 */
