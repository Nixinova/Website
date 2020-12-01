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
        stone: [87, 87, 87], polished_diorite: [145, 98, 80], sandstone: [91, 170, 126], dirt: [169, 121, 84], soul_soil: [67, 50, 40], pumpkin: [207, 126, 26], chiseled_nether_bricks: [57, 27, 33], ice: [135, 161, 208], snow_block: [219, 231, 231],
        crimson_planks: [115, 53, 78], warped_planks: [52, 120, 119],
        diamond_block: [92, 224, 207], emerald_block: [59, 222, 120], gold_block: [233, 197, 57], lapis_block: [27, 60, 121], redstone_block: [150, 22, 7], amethyst_block: [129, 97, 186],
        tube_coral_block: [30, 61, 150], brain_coral_block: [174, 64, 133], bubble_coral_block: [132, 20, 132], fire_coral_block: [150, 31, 43], horn_coral_block: [208, 199, 67],
        prismarine_bricks: [82, 160, 150],
        nether_wart_block: [84, 0, 0], warped_wart_block: [22, 101, 96],
        copper_block: [162, 89, 65], weathered_copper_block: [76, 147, 110],
        white_concrete: [190, 195, 195], orange_concrete: [203, 88, 0], magenta_concrete: [154, 44, 145], light_blue_concrete: [32, 124, 180], yellow_concrete: [221, 161, 19], lime_concrete: [87, 155, 23], pink_concrete: [195, 92, 130], gray_concrete: [50, 53, 57], light_gray_concrete: [113, 113, 104], cyan_concrete: [20, 110, 125], purple_concrete: [92, 29, 143], blue_concrete: [41, 43, 131], brown_concrete: [88, 54, 28], green_concrete: [67, 84, 34], red_concrete: [130, 29, 29], black_concrete: [6, 8, 13],
    }

    let colorArray = [];
    const SIZE = 25;
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            let rgba = getColor(img.width / SIZE * j, img.height / SIZE * i);

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
        colorArray[i] = { id: colorArray[i], Count: 1 }
    }//                                                     Removes quotes from tags
    let nbt = JSON.stringify({ Items: colorArray }).replace(/"([^(")\\]+)":/g, '$1:');

    window.Output = `/give @p bundle${nbt}`;
    if (window.Output.length > 256) $('#cmd-note').removeClass('hide');
    $('#generator-output').html(`
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
        $('#generator-output').html("An unknown error has occurred. Please try again or reload the page.");
        console.error(error.stack);
    }
}

/* Copyright © Nixinova 2020 */
