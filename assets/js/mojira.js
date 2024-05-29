const title = 'Mojira API Navigation – Nixinova';

function progress(val) {
    $('progress').attr('value', val);
}

function start() {
    progress(0);
    $('table').addClass('hide');
    $('#loading').removeClass('hide');
    $('#dropdown').html('<option></option>');
    $('table tbody').html('');
    location.hash = '';
}

function complete() {
    progress(1);
    setTimeout(function () {
        $('#loading').addClass('hide');
    }, 250);
    $('table').removeClass('hide');
}

function initial() {
    const params = (new URL(location.href)).searchParams;
    if (params.get('project')) generateProject(params.get('project'));
    else if (params.get('query')) generateIssues(params.get('project'), params.get('query'));
    else generateAllProjects();
}

async function generateAllProjects() {
    $('title').html(title);
    $('#navigation').addClass('hide');
    $('#navigation-type').text('version');
    $('#desc').text('');
    start();

    $('table thead').html(`
        <tr>
            <th>Icon</th>
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Navigation</th>
        </tr>
    `);

    try {
        const projectsData = await fetch('https://cors-anywhere.herokuapp.com/https://bugs.mojang.com/rest/api/2/project/')
            .then(data => data.json())
            .catch(err => { if (err) throw err; })
        progress(0.5);
        let tableContent = '';
        for (const project of projectsData) {
            tableContent += `
                <tr>
                    <td><img height="48px" src="${project.avatarUrls["48x48"]}"></td>
                    <td>${project.key}</td>
                    <td>${project.name}</td>
                    <td><a href="javascript:generateProject('${project.key}');history.pushState(null, null, `?project=${project}`);">Generate</a>
                </tr>
            `;
        }
        $('table tbody').append(tableContent);
        complete();
    }
    catch (err) {
        handleErr(err);
        complete();
    }
}

async function generateProject(project) {
    $('title').text(`Project ${project} – ${title}`);
    $('#navigation-type').text('version');
    $('#desc').text('');

    const searchQuery = (type, version, project) => encodeURIComponent(`${type} in ("${version}") AND project = ${project} ORDER BY key`);
    const bugsLink = (type, version, project) => 'https://bugs.mojang.com/issues/?jql=' + searchQuery(type, version, project);
    start();

    $('table thead').html(`
        <tr>
            <th style="max-width: 300px;">Version</th>
            <th style="width: 100px;">Date</th>
            <th>Description</th>
            <th style="width: 100px;">Quick Links</th>
            <th style="width: 100px;">Load Issues</th>
        </tr>
    `);

    try {
        const projectData = await fetch('https://cors-anywhere.herokuapp.com/https://bugs.mojang.com/rest/api/2/project/' + project)
            .then(data => data.json())
            .catch(err => { if (err) throw err; })
        $('table thead').prepend(`
            <tr><td colspan="5" style="text-align: center;">
                <a href="javascript:generateAllProjects();history.pushState(null, null, '?');" id="back-button">&larr; Back</a>
                <img src="${projectData.avatarUrls["48x48"]}"> ${projectData.name}
            </td></tr>
        `);
        progress(0.2);
        let dropdownContents = '';
        let tableContents = '';
        for (let i = projectData.versions.length - 1; i > 0; i--) {
            const version = projectData.versions[i];
            dropdownContents += `\n<option>${version.name}</option>`;
            tableContents += `
                <tr id="${version.name.replace(/ /g, '_')}">
                    <td style="max-width: 300px;">${version.name}</td>
                    <td style="width: 100px;"><samp>${version.released && version.releaseDate || ''}</samp></td>
                    <td><small>${version.description || ''}</small></td>
                    <td style="width: 100px;">
                        <a href="${bugsLink('affectedVersion', version.name, project)}" target="_blank">Bugs</a>,
                        <a href="${bugsLink('fixVersion', version.name, project)}" target="_blank">Fixes</a>
                    </td>
                    <td style="width: 100px;">
                        <a href="javascript:generateIssues('${project}', '${searchQuery('affectedVersion', version.name, project)}')">Bugs</a>,
                        <a href="javascript:generateIssues('${project}', '${searchQuery('fixVersion', version.name, project)}')">Fixes</a>
                    </td>
                </tr>
            `;
        }
        $('#dropdown').append(dropdownContents);
        $('table tbody').append(tableContents);
        $('#navigation').removeClass('hide');
        complete();
    }
    catch (err) {
        handleErr(err);
        complete();
    }
}

async function generateIssues(project, query) {
    history.pushState(null, null, `?project=${project}&query=${query}`);
    $('title').text(`Query ${decodeURIComponent(query)} – ${title}`);
    $('#navigation-type').text('issue');
    $('#desc').text(`Issues for query '${decodeURIComponent(query)}'`);

    start();
    $('table thead').html(`
        <tr>
            <th style="max-width: 300px;">Issue</th>
            <th style="width: 100px;">Date</th>
            <th style="width: 100px;">Popularity</th>
            <th style="width: 100px;">Status</th>
            <th style="width: 130px;">Affects</th>
            <th style="width: 100px;">Fixed in</th>
        </tr>
    `);

    try {
        const issuesData = await fetch('https://cors-anywhere.herokuapp.com/https://bugs.mojang.com/rest/api/2/search?jql=' + query)
            .then(data => data.json())
            .catch(err => { if (err) throw err; })
        $('table thead').prepend(`
            <tr><td colspan="6" style="text-align: center;">
                <a href="javascript:generateProject('${project}');history.pushState(null, null, '?project=${project}');" id="back-button">&larr; Back</a>
            </td></tr>
        `);
        progress(0.2);
        let dropdownContent = '';
        let tableContent = '';
        for (const issue of issuesData.issues) {
            const date = (new Date(issue.fields.created)).toISOString().replace('T', ' ').replace(/\.\d+Z/, '');
            dropdownContent += `\n<option>${issue.key}</option>`;
            tableContent += `
                <tr id="${issue.key}">
                    <td style="max-width: 300px;"><a href="https://bugs.mojang.com/issue/${issue.key}">${issue.key}</a></td>
                    <td style="width: 100px;"><samp>${date}</samp></td>
                    <td style="width: 100px;">${issue.fields.votes.votes} ⇧ ${issue.fields.watches.watchCount} 👁</td>
                    <td style="width: 100px;">${issue.fields.status.name}</td>
                    <td style="width: 130px;">
                        <details>
                            <summary>${issue.fields.versions.length} versions</summary>
                            ${issue.fields.versions.map(obj => obj.name).join(', ') || 'None'}
                        </details>
                    </td>
                    <td style="width: 100px;"><small>${issue.fields.fixVersions.map(obj => obj.name).join(', ')}</small></td>
                </tr>
            `;
        }
        $('#dropdown').append(dropdownContent);
        $('table tbody').append(tableContent);
        $('#navigation').removeClass('hide');
        complete();
    }
    catch (err) {
        handleErr(err);
        complete();
    }
}

function handleErr(err) {
    console.error(err);
    const errstr = JSON.stringify(err);
    if (errstr.includes('Too Many Requests')) {
        $('table').html('Too many requests to API. Please try again later.');
    }
    else {
        $('table').html('An error occurred. See browser console for details.');
    }
}

/* Copyright © Nixinova 2024 */
