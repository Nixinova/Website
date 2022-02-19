/// SUBMIT ///

function openFile(file) {
    let input = file.target;
    let reader = new FileReader();
    reader.onload = function () {
        let dataURL = reader.result;
        $('#output_image').prop('src', dataURL);
    };
    reader.readAsDataURL(input.files[0]);
}

async function loadColors() {
    window.blockColors = await fetch('/assets/data/block-colors.json').then(data => data.json());
}

function generate() {

    let img = output_image;
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    const getColor = (x, y) => canvas.getContext('2d').getImageData(x, y, 1, 1).data;

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
    if (window.Output.length > 1e5) $('#generator-output').css('font-family', 'sans-serif').html('<span onclick="copyCommand()">Too long to display; click to copy.</span>');
    else $('#generator-output').css('font-family', 'monospace').html(`
        <span class="§7">/give</span>
        <span class="§b">@p</span>
        <span class="§e">minecraft:bundle${nbt}</span>
    `);

    // counter //
    ++function_count;
}

async function submit() {
    try {
        await loadColors();
        generate();
    }
    catch (error) {
        $('#generator-output').css('font-family', 'sans-serif').html("An unknown error has occurred. Please try again or reload the page.");
        console.error(error.stack);
    }
}

/* Copyright © Nixinova 2022 */
