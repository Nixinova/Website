/// SUBMIT ///

function openFile(file) {
    let input = file.target;
    let reader = new FileReader();
    reader.onload = function () {
        let dataURL = reader.result;
        let output = document.getElementById('output_image');
        output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
}

function generate() {

    let img = output_image;
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    const getColor = (x, y) => canvas.getContext('2d').getImageData(x, y, 1, 1).data;

    const blockColors = {
        sandstone: [91, 170, 126], red_sand: [162, 88, 28], soul_soil: [67, 50, 40], pumpkin: [207, 126, 26], chiseled_nether_bricks: [57, 27, 33], ice: [135, 161, 208], snow_block: [219, 231, 231], slime_block: [115, 166, 104], brown_mushroom_block: [138, 104, 74], mushroom_stem: [182, 176, 164],

        crimson_planks: [115, 53, 78], warped_planks: [52, 120, 119],
        stripped_oak_wood: [117, 147, 93], stripped_spruce_wood: [110, 83, 50], stripped_birch_wood: [196, 176, 121], stripped_jungle_wood: [168, 123, 91], stripped_acacia_wood: [170, 90, 50], stripped_dark_oak_wood: [72, 46, 22], stripped_crimson_wood: [125, 52, 83], stripped_warped_wood: [56, 154, 151],

        diamond_block: [92, 224, 207], emerald_block: [59, 222, 120], gold_block: [233, 197, 57], lapis_block: [27, 60, 121], redstone_block: [150, 22, 7], amethyst_block: [129, 97, 186], netherite_block: [70, 67, 70],

        tube_coral_block: [30, 61, 150], brain_coral_block: [174, 64, 133], bubble_coral_block: [132, 20, 132], fire_coral_block: [150, 31, 43], horn_coral_block: [208, 199, 67],

        prismarine_bricks: [82, 160, 150], purpur_block: [150, 104, 149],

        quartz_block: [221, 218, 216], smooth_quartz: [217, 210, 203],

        nether_wart_block: [84, 0, 0], warped_wart_block: [22, 101, 96],

        copper_block: [162, 89, 65], weathered_copper_block: [76, 147, 110],

        terracotta: [34, 20, 15], white_terracotta: [192, 166, 148], orange_terracotta: [146, 77, 34], magenta_terracotta: [136, 80, 99], light_blue_terracotta: [104, 99, 126], yellow_terracotta: [169, 119, 32], lime_terracotta: [94, 107, 47], pink_terracotta: [146, 72, 71], gray_terracotta: [53, 38, 33], light_gray_terracotta: [123, 98, 89], cyan_terracotta: [78, 84, 83], purple_terracotta: [108, 63, 78], blue_terracotta: [67, 54, 83], brown_terracotta: [70, 47, 33], green_terracotta: [68, 75, 38], red_terracotta: [130, 56, 43], black_terracotta: [34, 20, 15],

        white_concrete: [190, 195, 195], orange_concrete: [203, 88, 0], magenta_concrete: [154, 44, 145], light_blue_concrete: [32, 124, 180], yellow_concrete: [221, 161, 19], lime_concrete: [87, 155, 23], pink_concrete: [195, 92, 130], gray_concrete: [50, 53, 57], light_gray_concrete: [113, 113, 104], cyan_concrete: [20, 110, 125], purple_concrete: [92, 29, 143], blue_concrete: [41, 43, 131], brown_concrete: [88, 54, 28], green_concrete: [67, 84, 34], red_concrete: [130, 29, 29], black_concrete: [6, 8, 13],
    }

    let colorArray = [];
    let resolution = value('resolution', 'int');
    for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
            let rgba = getColor(img.width / resolution * j, img.height / resolution * i);

            if (rgba[3] < 10) {
                colorArray.push('air');
                continue;
            }

            let rgbDists = {};
            for (let block in blockColors) {
                let color = blockColors[block];
                rgbDists[block] = Math.abs(color[0] - rgba[0]) + Math.abs(color[1] - rgba[1]) + Math.abs(color[2] - rgba[2]);
            }
            let shortestDist = 1e6;
            let blockMatch;
            for (let block in rgbDists) {
                if (rgbDists[block] < shortestDist) {
                    blockMatch = block;
                    shortestDist = rgbDists[block];
                }
            }
            colorArray.push(blockMatch.replace(/[0-9]+/, ''));
        }
    }
    colorArray.length--;
    for (let i in colorArray) {
        colorArray[i] = colorArray[i] === 'air' ? {} : { id: colorArray[i], Count: 1 };
    }

    let nbt = JSON.stringify({ Items: colorArray }).replace(/"([^(")\\]+)"/g, '$1');

    window.Output = `/give @p bundle${nbt}`;
    if (window.Output.length > 256) $('#cmd-note').removeClass('hide');
    if (window.Output.length > 1e5) $('#generator-output').css('font-family','sans-serif').html('<span onclick="copyCommand()">Too long to display; click to copy.</span>');
    else $('#generator-output').css('font-family', 'monospace').html(`
        <span class="§7">/give</span>
        <span class="§b">@p</span>
        <span class="§e">minecraft:bundle${nbt}</span>
    `);

    // counter //
    ++function_count;
}

function submit() {
    try {
        generate();
    }
    catch (error) {
        $('#generator-output').css('font-family','sans-serif').html("An unknown error has occurred. Please try again or reload the page.");
        console.error(error.stack);
    }
}

/* Copyright © Nixinova 2020 */
