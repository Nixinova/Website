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
        if (itemsFound[str]) {continue;}
        newArray.push(array[i]);
        itemsFound[str] = true;
    }
    return newArray;
}

/// SUBMIT ///

function give() {
    /// LISTS ///
    var durable_items = [
        "diamond_sword", "diamond_pickaxe", "diamond_axe", "diamond_shovel", "diamond_hoe",
        "iron_sword", "iron_pickaxe", "iron_axe", "iron_shovel", "iron_hoe",
        "golden_sword", "golden_pickaxe", "golden_axe", "golden_shovel", "golden_hoe",
        "stone_sword", "stone_pickaxe", "stone_axe", "stone_shovel", "stone_hoe",
        "wooden_sword", "wooden_pickaxe", "wooden_axe", "wooden_shovel", "wooden_hoe",

        "diamond_helmet", "diamond_chestplate", "diamond_leggings", "diamond_boots",
        "iron_helmet", "iron_chestplate", "iron_leggings", "iron_boots",
        "chainmail_helmet", "chainmail_chestplate", "chainmail_leggings", "chainmail_boots",
        "golden_helmet", "golden_chestplate", "golden_leggings", "golden_boots",
        "leather_helmet", "leather_chestplate", "leather_leggings", "leather_boots",

        "bow", "shears", "fishing_rod", "flint_and_steel", "carrot_on_a_stick", "elytra", "shield"
    ];
    var durabilities = {
        "diamond_sword": 1561, "diamond_pickaxe": 1561, "diamond_axe": 1561, "diamond_shovel": 1561, "diamond_hoe": 1561,
        "iron_sword": 250, "iron_pickaxe": 250, "iron_axe": 250, "iron_shovel": 250, "iron_hoe": 250,
        "golden_sword": 32, "golden_pickaxe": 32, "golden_axe": 32, "golden_shovel": 32, "golden_hoe": 32,
        "stone_sword": 131, "stone_pickaxe": 131, "stone_axe": 131, "stone_shovel": 131, "stone_hoe": 131,
        "wooden_sword": 59, "wooden_pickaxe": 59, "wooden_axe": 59, "wooden_shovel": 59, "wooden_hoe": 59,

        "diamond_helmet": 364, "diamond_chestplate": 529, "diamond_leggings": 496, "diamond_boots": 430,
        "iron_helmet": 166, "iron_chestplate": 241, "iron_leggings": 226, "iron_boots": 196,
        "chainmail_helmet": 166, "chainmail_chestplate": 241, "chainmail_leggings": 226, "chainmail_boots": 196,
        "golden_helmet": 78, "golden_chestplate": 113, "golden_leggings": 106, "golden_boots": 92,
        "leather_helmet": 56, "leather_chestplate": 81, "leather_leggings": 76, "leather_boots": 66,

        "bow": 384, "shears": 237, "fishing_rod": 64, "flint_and_steel": 63, "carrot_on_a_stick": 225, "elytra": 431, "shield": 336
    };
    var tags = [
        'acacia_logs','anvil','banners','birch_logs','buttons','carpets','coral_blocks','corals',
        'dark_oak_logs','doors','enderman_holdable','flower_pots','ice','impermeable','jungle_logs',
        'leaves','logs','oak_logs','planks','rails','sand','saplings','slabs','spruce_logs','stairs',
        'stone_bricks','underwater_bonemeals','valid_spawn','wall_corals','wooden_buttons',
        'wooden_doors','wooden_pressure_places','wooden_slabs','wooden_stairs','wool'
    ];

    /// VARIABLES ///
    {
        // call from input form //
        {
            var target = value('input_selector_target');
            var player = value('input_selector_player').replace(/[\ -]/g, "_").replace(/[^a-zA-Z0-9\_]/g,"");
            var target_x = value('input_selector_x','num');
            var target_y = value('input_selector_y','num');
            var target_z = value('input_selector_z','num');
            var dist_min = value('input_selector_dist_min','num');
            var dist_max = value('input_selector_dist_max','num');
            var selection_area = $('#input_selection_area').attr('class');
            var vol_x = value('input_selector_vol_x','num');
            var vol_y = value('input_selector_vol_y','num');
            var vol_z = value('input_selector_vol_z','num');
            var xrot_min = value('input_selector_xrot_min','num');
            var xrot_max = value('input_selector_xrot_max','num');
            var yrot_min = value('input_selector_yrot_min','num');
            var yrot_max = value('input_selector_yrot_max','num');
            var limit = value('input_selector_limit','int');
            var team = value('input_selector_team').toLowerCase().replace(/[\ -]/g, "_").replace(/[^a-z\_]/g,"");
            var team_invert = $('#input_selector_team_i').hasClass('on');
            var tag = value('input_selector_tag').toLowerCase().replace(/[\ -]/g, "_").replace(/[^a-z\_]/g,"");
            var tag_invert = $('#input_selector_tag_i').hasClass('on');
            var mode = value('input_selector_gm').toLowerCase();
            var mode_invert = $('#input_selector_gm_i').hasClass('on');
            var xp_min = value('input_selector_xp_min','int');
            var xp_max = value('input_selector_xp_max','int');
            var score = value('input_selector_score_objective').toLowerCase().replace(/[^a-z_:]/g,"");
            var score_min = value('input_selector_score_min','int');
            var score_max = value('input_selector_score_max','int');

            var item = value('input_item').toLowerCase().replace(/[\ \-]/g, "_").replace(/[^a-z_:]/g,"").replace(/_+/g, "_").replace(/:+/g, ":");
            var i_potion = value('input_item_potion').toLowerCase().replace(/[\ \-]/g, "_").replace(/[^a-z_:]/g,"").replace(/_+/g, "_");
            var i_head = value('input_item_head').replace(/[\ -]/g, "_").replace(/[^a-zA-Z0-9\_]/g,"");
            var i_firework_flicker = $('#input_item_firework_flicker').hasClass('on');
            var i_firework_flight = value('input_item_firework_flight','int');
            var i_firework_type = value('input_item_firework_type','int');
            alert($('#input_firework_type'));
            var i_firework_trail = $('#input_item_firework_trail').hasClass('on');
            var i_name = value('input_item_name').replace(/\\/g, "\\\\\\\\").replace(/\"/g, '\\\\\\"');
            var i_colour = value('input_item_colour').toLowerCase().replace(' ', '_');
            var i_bold = $('#input_item_b').hasClass('on');
            var i_italic = $('#input_item_i').hasClass('on');
            var i_underline = $('#input_item_u').hasClass('on');
            var i_strike = $('#input_item_s').hasClass('on');
            var i_obfus = $('#input_item_o').hasClass('on');
            var i_lore = value('input_item_lore').replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
            var i_ench = value('input_item_ench').toLowerCase().replace(/ /g, '_');
            var i_ench_lvl = value('input_item_ench_lvl',1);
            var i_unbreakable = $('#input_item_unbreakable').hasClass('on');
            var i_durability = value('input_item_durability',1);
            var i_destroy = value('input_item_destroy').toLowerCase().replace(/[ \-]/g, "_").replace(/[^a-z_:#]/g,"").replace(/_+/g, "_").replace(/:+/g, ":");
            var i_destroy_tag = value('input_item_destroy_tags').toLowerCase().replace(/ /g, '_');
            var i_place_on = value('input_item_place_on').toLowerCase().replace(/[\ \-]/g, "_").replace(/[^a-z_:#]/g,"").replace(/_+/g, "_").replace(/:+/g, ":");
            var i_place_on_tag = value('input_item_place_on_tags').toLowerCase().replace(/ /g, '_');
            var i_mod = value('input_item_mod');
            var i_mod_amount = value('input_item_mod_value','int');
            var i_mod_op = value('input_item_mod_operation','num');
            var i_mod_slot = value('input_item_mod_slot').toLowerCase().replace(/ /g, '');
            var i_mod_uuid_least = value('input_item_mod_uuid_least','int');
            var i_mod_uuid_most = value('input_item_mod_uuid_most','int');

            var count = value('input_count');
        }

        // fix values //
        if (dist_max && dist_min > dist_max) {let foo = dist_min; dist_min = dist_max; dist_max = foo;}
        if (xrot_max && xrot_min > xrot_max) {let foo = xrot_min; xrot_min = xrot_max; xrot_max = foo;}
        if (yrot_max && yrot_min > yrot_max) {let foo = yrot_min; yrot_min = yrot_max; yrot_max = foo;}
        if (xp_max && xp_min > xp_max) {let foo = xp_min; xp_min = xp_max; xp_max = foo;}
        if (score_max && score_min > score_max) {let foo = score_min; score_min = score_max; score_max = foo;}

        // hide flags //
        var hf = 0
        if ($('#ench').hasClass('off')) {hf +=  1;}
        if ($('#mods').hasClass('off')) {hf +=  2;}
        if ($('#unbr').hasClass('off')) {hf +=  4;}
        if ($('#dstr').hasClass('off')) {hf +=  8;}
        if ($('#plon').hasClass('off')) {hf += 16;}
        if ($('#othr').hasClass('off')) {hf += 32;}
    }

    /// OTHER ///
    if (target == '@e') {
        $('.player_only').addClass('hide');
    } else {
        $('.player_only').removeClass('hide');
    }

    /// GENERATOR ///
    $('#output_text').empty();
    $('#cmd_note').addClass('hide');

    {
        // select player //
        {
            if (target == '--') {
                $('#select-username').removeClass('hide');
                $('#expand-target').addClass('hide');
                if ($('#expand-target').hasClass('minus')) {
                    show_more('expand-target','target-content',false);
                }
            } else {
                $('#select-username').addClass('hide');
                $('#expand-target').removeClass('hide');
                document.getElementById('input_selector_player').value = '';
            }

            var selector = []

            if (target != '--') {target_text = target;} else {target_text = '@p';}

            if (target_x) {selector.push('x=' + target_x);}
            if (target_y) {selector.push('y=' + target_y);}
            if (target_z) {selector.push('z=' + target_z);}

            if (selection_area == 'radius' && (dist_min || dist_max)) {
                if (dist_min && !dist_max) {selector.push('distance=' + dist_min + '..');}
                if (!dist_min && dist_max) {selector.push('distance=' + '..' + dist_max);}
                if (dist_min && dist_max && dist_min != dist_max) {selector.push('distance=' + dist_min + '..' + dist_max);}
                if (dist_min && dist_max && dist_min == dist_max) {selector.push('distance=' + dist_min);}
            }

            if (selection_area == 'volume' && (vol_x || vol_y || vol_z)) {
                if (vol_x) {selector.push('dx=' + vol_x);}
                if (vol_y) {selector.push('dy=' + vol_y);}
                if (vol_z) {selector.push('dz=' + vol_z);}
            }

            if (xrot_min || xrot_max) {
                if (xrot_min && !xrot_max) {selector.push('x_rotation=' + xrot_min + '..');}
                if (!xrot_min && xrot_max) {selector.push('x_rotation=' + '..' + xrot_max);}
                if (xrot_min && xrot_max && xrot_min != xrot_max) {selector.push('x_rotation=' + xrot_min + '..' + xrot_max);}
                if (xrot_min && xrot_max && xrot_min == xrot_max) {selector.push('x_rotation=' + xrot_min);}
            }

            if (yrot_min || yrot_max) {
                if (yrot_min && !yrot_max) {selector.push('y_rotation=' + yrot_min + '..');}
                if (!yrot_min && yrot_max) {selector.push('y_rotation=' + '..' + yrot_max);}
                if (yrot_min && yrot_max && yrot_min != yrot_max) {selector.push('y_rotation=' + yrot_min + '..' + yrot_max);}
                if (yrot_min && yrot_max && yrot_min == yrot_max) {selector.push('y_rotation=' + yrot_min);}
            }

            if (limit) {selector.push('limit=' + limit);}

            if (team) {
                if (team_invert) {selector.push('team=!' + team);}
                else {selector.push('team=' + team);}
            }

            if (tag) {
                if (tag_invert) {selector.push('tag=!' + tag);}
                else {selector.push('tag=' + tag);}
            }
            
            if (mode) {
                var mode_option;
                if (mode_invert) {mode_option = '!';} else {mode_option = '';}
                selector.push('gamemode=' + mode_option + mode);
            }
            
            if (xp_min || xp_max) {
                if (xp_min && !xp_max) {selector.push('level=' + xp_min + '..');}
                if (!xp_min && xp_max) {selector.push('level=' + '..' + xp_max);}
                if (xp_min && xp_max && xp_min != xp_max) {selector.push('level=' + xp_min + '..' + xp_max);}
                if (xp_min && xp_max && xp_min == xp_max) {selector.push('level=' + xp_min);}
            }
            
            if (score && (score_min || score_max)) {
                scores.push(score);
                scores_min.push(score_min);
                scores_max.push(score_max);
                scores_min[scores.indexOf(score)] = score_min;
                scores_max[scores.indexOf(score)] = score_max;
                
                let new_scores = [];
                let new_min = [];
                let new_max = [];
                for (a = 0; a < scores.length; a++) {
                    if (new_scores.indexOf(scores[a]) == -1) {
                        new_scores.push(scores[a]);
                        new_min.push(scores_min[a]);
                        new_max.push(scores_max[a]);
                    }
                }
                scores = new_scores, scores_min = new_min, scores_max = new_max;

                score_text = []
                for (i = 0; i < scores.length; i++) {
                    if (scores[i]) {
                        if (scores_min[i] && !scores_max[i]) {score_text.push(scores[i] + '=' + scores_min[i] + '..');}
                        if (!scores_min[i] && scores_max[i]) {score_text.push(scores[i] + '=' + '..' + scores_max[i]);}
                        if (scores_min[i] && scores_max[i] && scores_min[i] != scores_max[i]) {score_text.push(scores[i] + '=' + scores_min[i] + '..' + scores_max[i]);}
                        if (scores_min[i] && scores_max[i] && scores_min[i] == scores_max[i]) {score_text.push(scores[i] + '=' + scores_min[i]);}
                    }
                }
                selector.push('scores={' + JSON.stringify(score_text).replace(/[\[\]]/g,'') + '}');
            }
            
            if (selector.length == 0) {
                selector = '';
            } else {
                selector = JSON.stringify(selector).replace(/"/g,'').replace(/\\/g,'');
            }
        }
        if (player) {
            target_text = player;
            selector = '';
        }

        // select item //
        var colpos = item.search(':');
        var item_id = item.replace('minecraft:','');
        if (!item || item === 'minecraft:' || item === ':') {item = 'stone';}
        if (colpos === item.length-1) {item = 'minecraft:' + item.slice(0,-1);}
        if (colpos === -1) {item = 'minecraft:' + item;} else
        if (colpos === 0) {item = 'minecraft' + item;}
        // NBT //
        {
            nbt = {};

            // potion //
            if (item_id === 'potion' || item_id === 'splash_potion' || item_id === 'lingering_potion') {
                $('#potion').removeClass('hide');
            } else {
                $('#potion').addClass('hide');
                document.getElementById('input_item_potion').value = '';
            }
            if (i_potion) {nbt.Potion = i_potion;}

            // head //
            if (item_id === 'player_head' || item_id === 'player_wall_head') {
                $('#head').removeClass('hide');
            } else {
                $('#head').addClass('hide');
                document.getElementById('input_item_head').value = '';
            }
            if (i_head) {nbt.SkullOwner = i_head;}

            // fireworks //
            if (item_id === 'firework_rocket') {
                $('firework').removeClass('hide');
            } else {
                $('#firework').addClass('hide');
            }
            if (i_firework_type || i_firework_trail || i_firework_twinkle|| i_firework_flight) {
                let explosions = [];
                if (i_firework_type) {explosions.push({"Type": i_firework_type});}
                if (i_firework_flicker) {explosions.push({"Flicker": i_firework_flicker});}
                if (i_firework_trail) {explosions.push({"Trail": i_firework_trail});}
                nbt.Fireworks = {};
                nbt.Fireworks.Explosions = explosions;
                if (i_firework_flight) {nbt.Fireworks.Flight = i_firework_flight;}
            }

            // display //
            if (i_name || i_lore) {nbt.display = {};}
            display = {};

            if (i_name) {
                var preview = $('#preview-text');
                $('#preview').removeClass('hide');
                preview.html(i_name.replace(/\\\\\\\\/g,'\\').replace(/\\\\\\"/g,'"'));
                display.text = i_name;

                var colour
                if (!i_colour                  ) {colour = '#fff'; shadow = '#000000';}
                if (i_colour === 'aqua'        ) {colour = '#5ff'; shadow = '#00002a';}
                if (i_colour === 'black'       ) {colour = '#000'; shadow = '#002a00';}
                if (i_colour === 'blue'        ) {colour = '#55f'; shadow = '#002a2a';}
                if (i_colour === 'dark_aqua'   ) {colour = '#0aa'; shadow = '#2a0000';}
                if (i_colour === 'dark_blue'   ) {colour = '#00a'; shadow = '#2a002a';}
                if (i_colour === 'dark_gray'   ) {colour = '#555'; shadow = '#2a2a00';}
                if (i_colour === 'dark_green'  ) {colour = '#0a0'; shadow = '#2a2a2a';}
                if (i_colour === 'dark_purple' ) {colour = '#a0a'; shadow = '#151515';}
                if (i_colour === 'dark_red'    ) {colour = '#a00'; shadow = '#15153f';}
                if (i_colour === 'gold'        ) {colour = '#fa0'; shadow = '#153f15';}
                if (i_colour === 'gray'        ) {colour = '#aaa'; shadow = '#153f3f';}
                if (i_colour === 'green'       ) {colour = '#5f5'; shadow = '#3f1515';}
                if (i_colour === 'light_purple') {colour = '#f5f'; shadow = '#3f153f';}
                if (i_colour === 'red'         ) {colour = '#f55'; shadow = '#3f3f15';}
                if (i_colour === 'yellow'      ) {colour = '#ff5'; shadow = '#3f3f3f';}

                if (i_colour) {
                    display.color = i_colour;
                }
                preview.css('color',colour);
                preview.css('text-shadow','2px 2px' + shadow);

                if (i_bold) {
                    display.bold = true;
                    preview.css('font-weight','bold');
                } else {
                    preview.css('font-weight','inherit');
                }

                if (!i_italic) {
                    display.italic = false;
                    preview.css('font-style','inherit');
                } else {
                    preview.css('font-style','italic');
                }

                if (i_underline) {
                    display.underlined = true;
                    preview.css('text-decoration','underline');
                } else if (!i_strike) {
                    preview.css('text-decoration','inherit');
                }

                if (i_strike) {
                    display.strikethrough = true;
                    preview.css('text-decoration','line-through');
                } else if (!i_underline) {
                    preview.css('text-decoration','inherit');
                }

                if (i_strike && i_underline) {
                    preview.css('text-decoration','underline line-through');
                }

                if (i_obfus) {
                    display.obfuscated = true;
                    preview.html('*')
                    for (i = 0; i < i_name.length-1; i++) {
                        preview.html(preview.html() += '*');
                    }
                }

                nbt.display.Name = JSON.stringify(display)
                .replace(/\\\\\\\\\\\\\\\\/g, '\\\\').replace(/\\\\\\\\\\\\\\"/g, '\\"');
            } else {
                $('#preview').addClass('hide');
            }

            // lore //
            if (i_lore) {
                i_lore = i_lore.replace(/\\\\/g, '\\').replace(/\\"/g, '\"').replace(/,/g, '&comma;');
                i_lore = i_lore.split('\n');  
                nbt.display.Lore = JSON.stringify(i_lore).replace(/^\[|\]$/g, '').split(',');
            }

            // enchantments //
            if (i_ench) {
                e.push(i_ench);
                elvl.push(i_ench_lvl);
                elvl[e.indexOf(i_ench)] = i_ench_lvl;
                
                let e2 = [];
                let elvl2 = [];
                for (a = 0; a < e.length; a++) {
                    if (e2.indexOf(e[a]) == -1) {
                        e2.push(e[a]);
                        elvl2.push(elvl[a]);
                    }
                }
                e = e2;
                elvl = elvl2;

                nbt.Enchantments = []
                for (i = 0; i < e.length; i++) {
                    if (e[i]) {
                        nbt.Enchantments.push({id: '"minecraft:' + e[i] + '"', lvl: elvl[i]});
                    }
                }
            }

            // tools & weapons items //
            if (durable_items.indexOf(item_id) > -1) {
                $('.tool').removeClass('hide');
            } else {
                $('.tool').addClass('hide');
                document.getElementById('input_item_unbreakable').checked = false;
                document.getElementById('input_item_durability').value = '';
            }

            // damage //
            var damage = durabilities[item_id] - i_durability;
            if (i_durability && !i_unbreakable) {nbt.Damage = damage;}

            // unbreakable //
            if (i_unbreakable) {nbt.Unbreakable = true;}

            // CanDestroy //
            if (i_destroy) {
                CanDestroy.push(i_destroy)
                for (i = 0; i < CanDestroy.length; i++) {
                    for (j = 0; j < tags.length; j++) {
                        if (CanDestroy[i] == tags[j]) {CanDestroy[i] = '#' + tags[j];}
                    }
                }
                CanDestroy = rvDupes(CanDestroy)
                nbt.CanDestroy = CanDestroy
            }
            if (i_destroy_tag) {
                CanDestroy.push('#' + i_destroy_tag)
                for (i = 0; i < CanDestroy.length; i++) {
                    for (j = 0; j < tags.length; j++) {
                        if (CanDestroy[i] == tags[j]) {CanDestroy[i] = '#' + tags[j];}
                    }
                }
                CanDestroy = rvDupes(CanDestroy);
                nbt.CanDestroy = CanDestroy;
            }

            // CanPlaceOn //
            if (i_place_on) {
                CanPlaceOn.push(i_place_on)
                for (i = 0; i < CanPlaceOn.length; i++) {
                    for (j = 0; j < tags.length; j++) {
                        if (CanPlaceOn[i] == tags[j]) {CanPlaceOn[i] = '#' + tags[j];}
                    }
                }
                CanPlaceOn = rvDupes(CanPlaceOn);
                nbt.CanPlaceOn = CanPlaceOn;
            }
            if (i_place_on_tag) {
                CanPlaceOn.push('#' + i_place_on_tag)
                for (i = 0; i < CanPlaceOn.length; i++) {
                    for (j = 0; j < tags.length; j++) {
                        if (CanPlaceOn[i] == tags[j]) {CanPlaceOn[i] = '#' + tags[j];}
                    }
                }
                CanPlaceOn = rvDupes(CanPlaceOn);
                nbt.CanPlaceOn = CanPlaceOn;
            }

            // modifiers //
            if (i_mod === 'maxHealth'           && i_mod_amount > 1024)  {i_mod_amount =  1024;}
            if (i_mod === 'followRange'         && i_mod_amount > 2048)  {i_mod_amount =  2048;}
            if (i_mod === 'knockbackResistance' && i_mod_amount > 1)     {i_mod_amount =     1;}
            if (i_mod === 'movementSpeed'       && i_mod_amount > 1024)  {i_mod_amount =  1024;}
            if (i_mod === 'attackDamage'        && i_mod_amount > 2048)  {i_mod_amount =  2048;}
            if (i_mod === 'armor'               && i_mod_amount > 30)    {i_mod_amount =    30;}
            if (i_mod === 'armorToughness'      && i_mod_amount > 20)    {i_mod_amount =    20;}
            if (i_mod === 'attackSpeed'         && i_mod_amount > 1024)  {i_mod_amount =  1024;}
            if (i_mod === 'luck'                && i_mod_amount > 1024)  {i_mod_amount =  1024;}
            if (i_mod === 'luck'                && i_mod_amount < -1024) {i_mod_amount = -1024;}
            if (i_mod !== 'luck'                && i_mod_amount <= 0)    {i_mod_amount =     0;}

            if (i_mod && i_mod_amount) {

                if (!i_mod_uuid_least) {i_mod_uuid_least = uuids[i_mod][0];}
                if (!i_mod_uuid_most) {i_mod_uuid_most = uuids[i_mod][1];}

                for (i = 0; i < modifiers.length; i++) {
                    if (modifiers[i].AttributeName == 'generic.'+ i_mod) {
                        modifiers.splice(i,1);
                    }
                }

                if (i_mod_slot) {
                    modifiers.push({
                        AttributeName: 'generic.'+ i_mod, Name: 'generic.' + i_mod,
                        Amount: i_mod_amount, Operation: i_mod_op, Slot: i_mod_slot,
                        UUIDLeast: i_mod_uuid_least, UUIDMost: i_mod_uuid_most
                    });
                } else {
                    modifiers.push({
                        AttributeName: 'generic.'+ i_mod, Name: 'generic.' + i_mod,
                        Amount: i_mod_amount, Operation: i_mod_op,
                        UUIDLeast: i_mod_uuid_least, UUIDMost: i_mod_uuid_most
                    });
                }

                nbt.AttributeModifiers = rvNestedDupes(modifiers);
            }
                        
            // hide flags //
            if (hf > 0) {nbt.HideFlags = hf;}

            // nbt //
            if (!isEmpty(nbt)) {
                NBT = JSON.stringify(nbt)
                .replace(/"([^(")\\]+)":/g,'$1:')
                .replace(/\\",lvl:/g,'",lvl:')
                .replace(/}"]/g, '}]')
                .replace(/"{id:\\/g, "{id:")
                .replace(/}",{id:/g, "},{id:")
                .replace(/&comma;/g, ',');
            } else {NBT = '';}
        }

        // count //
        if (count == '') {count = '1';}
    }

    /// OUTPUT ///
    var output = '/give ' + target_text + selector + ' ' + item + NBT + ' ' + count;
    if (output.length > 256) {
        $('#cmd_note').removeClass('hide');
        if (target == '@s') {target = '@p';}
    }
    $('#output_text').append(
        '<span style="color: lightgray">/give</span> ' +
        '<span style="color: #5ff">' + target_text + selector + '</span> ' +
        '<span style="color: #ff5">' + item + NBT.replace(/&/g, '&amp;') + '</span> ' +
        '<span style="color: lightgreen">' + count + '</span>'
    );

    // copy text
    const _ = ' ';
    var copyText = '/give ' + target_text + selector +_+ item + NBT +_+ count;

    let box = document.createElement('textarea');
    box.value = copyText;
    document.body.appendChild(box);
    box.select();
    document.execCommand('copy');
    document.body.removeChild(box);
}

function submit() {
    try {
        give();
    }
    catch (error) {
        alert('Error on submit: ' + error.message + '.');
    }
    finally {
        give();
    }
}

/* Copyright 2018 Nixinova */