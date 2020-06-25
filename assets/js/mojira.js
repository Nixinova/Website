function progress(val) {
    $('progress').attr('value', val);
}

function start() {
    progress(0);
    $('#loading').removeClass('hide');
    $('#information').html('');
    $('table tbody').html('');
}

function complete() {
    progress(1);
    setTimeout(function () {
        $('#loading').addClass('hide');
    }, 250);
    $('table').removeClass('hide');
}

function initial() {
    generateAllProjects()
}

function generateAllProjects() {
    start();
    $('table thead').html(`
        <tr>
            <th>Icon</th>
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Navigation</th>
        </tr>
    `);
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://bugs.mojang.com/rest/api/2/project/'
    }).done(function (data) {
        progress(0.5);
        for (let project of data) {
            $('table tbody').append(`
                <tr>
                    <td><img src="${project.avatarUrls["48x48"]}"></td>
                    <td>${project.key}</td>
                    <td>${project.name}</td>
                    <td><a href="javascript:generateProject('${project.key}')">Generate</a>
                </tr>
            `);
        }
        complete();
    });
}

function generateProject(project) {
    start();
    $('table thead').html(`
        <tr>
            <th>Version</th>
            <th>Date</th>
            <th>Description</th>
        </tr>
    `);
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://bugs.mojang.com/rest/api/2/project/' + project
    }).done(function (data) {
        //$('#information').html(data.description);
        $('table thead').prepend(`<tr><td colspan=3> <a href="javascript:generateAllProjects()">&larr; Back</a> </td></tr>`);
        for (let version of data.versions) {
            $('table tbody').append(`
                <tr>
                    <td style="max-width: 300px">${version.name}</td>
                    <td style="max-width: 100px"><samp>${version.released && version.releaseDate || ''}</samp></td>
                    <td>${version.description || ''}</td>
                </tr>
            `);
        }
        complete();
    });
}

/* Copyright © Nixinova 2020 */