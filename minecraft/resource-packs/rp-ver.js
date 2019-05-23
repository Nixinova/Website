//function create_element() {
    class rp_ver extends HTMLAnchorElement {
        constructor() {
            super();

            var ver = document.createElement('a');
            var link = this.getAttribute('link');
            var mc_ver = this.getAttribute('mc-ver');
            var pack_ver = this.getAttribute('pack-ver');
            ver.href = `https://mediafire.com/?${link}`;
            ver.title = `${pack_ver} (for ${mc_ver})`
            ver.textContent = pack_ver;
            ver.target = '_blank';

            var shadow = this.attachShadow({mode: 'open'});
            shadow.appendChild(ver);
        }
    }

    customElements.define('rp-ver', rp_ver);
//}