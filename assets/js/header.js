window.navVisible = false;

function hideNav() {
    $('nav').addClass('hide');
    $('main').removeClass('desktoponly');
    navVisible = false;
}

function showNav() {
    $('nav').removeClass('hide');
    $('main').addClass('desktoponly');
    navVisible = true;
}

function toggleNav() {
    navVisible ? hideNav() : showNav();
};

document.addEventListener('DOMContentLoaded', () => {
    $('[data-icon]').each(elem => {
        const icon = $(elem).data('icon');
        $(elem).html(`<img src="/assets/images/icons/${icon}.png" alt="${icon}" data-credit="FontAwesome">`);
    });
    $('a[href*="http"]').attr('rel', 'noreferrer');
});
