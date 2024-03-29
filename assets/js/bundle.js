/// SUBMIT ///

function bundle() {

    /// VARIABLES ///
    // call from input form //
    var target = value('input_target');
    var player = value('input_player');
    var size_x = value('size_x');
    var size_y = value('size_y');
    var padding = $('#padding').hasClass('on');
    var nbt = { Items: [] };

    // player //
    switch (target) {
        case '@s': $('#select-username').addClass('hide'); break;
        case '--': $('#select-username').removeClass('hide'); break;
        default: {
            $('#select-username').addClass('hide');
            $('#input_player').val('');
        }
    }

    /// GENERATOR ///
    // OUTPUT //
    $('#generator-output').empty();
    $('#cmd-note').addClass('hide');

    if (target === '--') target = player || '@s';

    // BUNDLE DATA //

    // create map of items with IDs
    let bundleItems = [];
    for (let i = 1; i <= window.bundleItemCount; i++) {
        bundleItems[i] = $(`#item-id_${i}`).val() || 'minecraft:stone';
    }

    // create bundle slots
    if (window.size_old !== size_x + 'x' + size_y) {
        window.size_old = size_x + 'x' + size_y;
        let tableContent = '<tbody>';
        for (let i = 0; i < size_y; i++) {
            tableContent += '<tr>';
            for (let j = 0; j < size_x; j++) {
                tableContent += `<td><input id="bundle_slot_${i}_${j}" min="1" type="number" placeholder=" " onchange="submit()"></td>`;
            }
            tableContent += '</tr>';
        }
        tableContent += '</tbody>';
        $('#bundle_contents').html(tableContent);
    }

    if (padding) {
        if (size_y < size_x) size_y = size_x - 1;
        else if (size_x < size_y) size_x = size_y;
    }
    for (let i = 0; i < size_y; i++) {
        for (let j = 0; j < size_x; j++) {
            const id = $(`#bundle_slot_${i}_${j}`)?.val();
            if (!id) continue;
            const item = bundleItems[id] || '';
            nbt.Items.push(item ? { id: item, Count: 1 } : {});
            if (padding && size_x === size_y && size_x > 1 && j === size_x - 1) nbt.Items.push({});
        }
    }

    // style bundle slots
    $('td input').css('background', '');
    for (let i = 1; i <= window.bundleItemCount; i++) {
        $('td input').each(elem => {
            if (parseInt($(elem).val()) === i) $(elem).css('background', `hsl(${i * 47 + 180}, 70%, 70%)`);
        });
    }

    // CONVERT TO NBT //
    if (!isEmpty(nbt)) {
        const quoteRemoverRegex = /"([^(")\\]+)":/g;
        nbt = JSON.stringify(nbt).replace(quoteRemoverRegex, '$1:');
    } else nbt = '';

    /// OUTPUT ///
    window.Output = `/give ${target} bundle${nbt}`;
    if (window.Output.length > 256) {
        window.Output = Output.replace(/^\/give @s/, '/give @p');
        if (target === '@s') target = '@p';
        $('#cmd-note').removeClass('hide');
    }
    $('#generator-output').append(`
        <span class="§7">/give</span>
        <span class="§b">${target}</span>
        <span class="§e">minecraft:bundle${nbt}</span>
    `);

    // counter //
    ++function_count;
}

function submit() {
    try {
        bundle();
    }
    catch (error) {
        $('#generator-output').html("An unknown error has occurred. Please try again or reload the page.");
        console.error(error.stack);
    }
}

/* Copyright © Nixinova 2021 */
