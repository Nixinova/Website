function error(err) {
    if (err === "PlayerNotFoundError") {
        $('#username_uuid').empty();
        $('#username-history').html("Could not find player");
        $('#skin').empty();
    } else if (err === "SkinNotFoundError") {
        $('#skin').empty();
    } else {
        $('output').html("Unknown error")
    }
}

function progress(val) {
    $('progress').attr('value',val);
}

var query = location.href.split('?')[1];
$(function() {
    if (query) {
        getInfo(query);}
        $('#input-username').val(query);
    }
);

var skinURLs = {}, capeURLs = {};
function getInfo(username) {
    $('#loading').removeClass('hide');
    progress(0.0);
    if (!username && query) username = query;
    $('#username-history').empty();
    $('#username_uuid').html('Loading...');
    $('#skin').empty();
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://api.mojang.com/users/profiles/minecraft/' + username
    }).done(function(data) {
        progress(0.3);
        if (!data) error("PlayerNotFoundError");
        var username;
        var uuid;
        if (data) uuid = data.id;
        var uuidFormatted = [
            uuid.substring(0,8),
            uuid.substring(8,12), uuid.substring(12,17), uuid.substring(17,21),
            uuid.substring(21,32)
        ].join('-');
        $.ajax({
            url: `https://cors-anywhere.herokuapp.com/https://api.mojang.com/user/profiles/${uuid}/names`
        }).done(function(data) {
            progress(0.6);
            $('#username-history').empty();
            username = data[data.length-1].name;
            $('#username_uuid').html(`<strong style="font-size: 1.5em;">${username} (UUID ${uuidFormatted})</strong>`);
            for (i in data) {
                let name = data[i].name;
                let date = moment(data[i].changedToAt).format('DD MMM YYYY [at] HH:mm:ss [UTC]');
                if (i == 0 && data.length == 1) {
                    $('#username-history').append(`<li>Current name: ${name}</li>`);
                } else if (i == data.length-1) {
                    $('#username-history').append(`<li>Name #${parseInt(i)+1} (current): ${name}<br class="mobileonly"/>(changed on ${date})</li>`);
                } else if (i == 0) {
                    $('#username-history').append(`<li>Name #1: ${name}</li>`);
                } else {
                    $('#username-history').append(`<li>Name #${parseInt(i)+1}: ${name} <br class="mobileonly"/>(changed on ${date})</li>`);
                }
            }
            $.ajax({
                url: 'https://cors-anywhere.herokuapp.com/https://sessionserver.mojang.com/session/minecraft/profile/' + uuid
            }).done(function(data) {
                progress(0.9);
                let encoded_data = data.properties[0].value;
                let decoded_data = JSON.parse(atob(encoded_data));
                let skinURL = decoded_data.textures.SKIN.url.replace('http:','https:');
                if (username) skinURLs[username] = skinURL;
                $('#skin').html(`
                    <img src="${skinURL}" alt="${username}'s skin">
                `);
                if (cape = decoded_data.textures.CAPE) {
                    capeURL = cape.url.replace('http:','https:');
                    if (username) capeURLs[username] = capeURL;
                    $('#skin').append(`
                        <img src="${capeURL}" alt="${username}'s cape">
                    `);
                }
                progress(1);
                $('#loading').addClass('hide');
            }).fail(function(data, textStatus, error) {
                if (skinURLs[username] || capeURLs[username]) {
                    $('#skin').append(`
                        <img src="${skinURLs[username]}" alt="${username}'s skin">
                    `);
                    if (capeURLs[username]) {
                        $('#skin').append(`
                            <img src="${capeURLs[username]}" alt="${username}'s cape">
                        `);
                    }
                } else {
                    error("SkinNotFoundError");
                }
            });
        }).fail(function() {
            error("PlayerNotFoundError");
        });
    }).fail(function() {
        error("PlayerNotFoundError");
    });
}

/* Copyright © Nixinova 2020 */