//function create_element() {
    class rp_ver extends HTMLAnchorElement {
        constructor() {
            super();

            var ver = document.createElement('a');
            var attr = {};
            attr.link = this.getAttribute('link');
            attr.mc_ver = this.getAttribute('mc-ver');
            attr.pack_ver = this.getAttribute('pack-ver');

            var href = `https://mediafire.com/?${attr.link}`;
            var title = `${attr.pack_ver} (for ${attr.mc_ver})`
            var textContent = attr.pack_ver;

            ver.href = href; ver.title = title; ver.textContent = textContent; ver.target = '_blank';

            var shadow = this.attachShadow({mode: 'open'});
            //shadow.appendChild(`<a href="${href}" title="${title}" target="_blank">${textContent}</a><br>`);
            shadow.appendChild(ver);
        }
    }

    customElements.define('rp-ver', rp_ver);
//}