@var body color
    #313131
@var header color
    #222
@var header height
    82px
@var footer height
    72px
@var main height
    calc( 100vh - $(footer height) )
@var vargen | 1
    --$(@replace | $[1] |  | - ): $($[1]);
@endvar

//:root {$(vargen|body color) $(vargen|header color) $(vargen|header height) $(vargen|footer height) $(vargen|main height)}
:root {--body-color: $(body color); --header-color: $(header-color); --header-height: $(header height); --footer-height: $(footer height); --main-height: $(main height);}

// Base elements //
* {box-sizing: border-box;}
body {font: normal 15px 'Montserrat', sans-serif; background: $(body color); margin: 0; color: #eee; line-height: 1.8;}
header {position: fixed; width: 100%; z-index: 100;}
main {padding-top: $(header height); min-height: $(main height);}
p {margin: 1em; text-align: center;}
i:not(.noclick) {cursor: pointer;}
code {font-size: 1.1em;}
kbd {border: 1px solid #fff; background-color: #fff4; padding: 2px 3px; font-family: monospace;}
img {max-width: 100%; vertical-align: middle; border: 0;}
abbr {cursor: help;}

// Footer //
footer {width: 100%; padding: 15px; background: $(header color); margin-top: 12px; border-top: 2px solid #fff; text-align: center;}
footer ul {margin: 0;}
footer li {display: inline; white-space: nowrap;}
footer li:not(:empty):not(:first-child)::before {content: ' • ';}

// Headings //
h1, h2, h3, h4, h5, h6 {margin: 0; color: #eee; font-weight: bold; text-align: center;}
h1, h2, h3, h4 {text-transform: uppercase;}
h1 {font-size: 2.6em;}
h2 {font-size: 2.1em;}
h3 {font-size: 1.6em;}
h4 {font-size: 1.4em;}
h5 {font-size: 1.2em;}
h2.section-header {margin-top: 0.8em; margin-bottom: 0.5em;}
h2.section-header::after {content: ""; display: block; width: 15vw; height: 2px; margin-left: calc(50% - 7.5vw); background: #fff; transition: 1s;}
h2.section-header:hover::after {width: 20vw; margin-left: calc(50% - 10vw);}

// Links //
a {text-decoration: none; cursor: pointer;}
a[href] {color: #acf; transition: 0.2s;}
a[href]:hover {opacity: 0.5;}
a.hover-underline {display: block;}
a.hover-underline::after {content: ""; display: block; width: 0; height: 2px; background: #fff; color: #fff; transition: 0.4s;}
:hover>a.hover-underline::after {width: 5em;}

// Tables //
table.styled th, table.styled td {border: 1px solid #555; padding: 0.2em 0.4em;}

// Dividers //
hr.half {width: 50%;}
hr.divider {width: 90%;}

// Videos //
iframe.youtube {width: 80vw; height: 45vw; max-width: 960px; max-height: 540px;}

// Galleries //
#gallery {width: 100%; margin-bottom: 1em;}
#gallery .screenshot {display: flex; height: 75/16*10vh; border-bottom: 2px solid #fff; background: #333 center/cover; background-blend-mode: overlay;}
#gallery .screenshot>* {margin: auto;}

// Buttons //
button {background: #19f; color: #fff; padding: 12px 30px; cursor: pointer; font-size: 20px; border: none; border-radius: 0.5em;}
button:hover {background: #08f; transition: 0.25s;}
button.download {margin: 0; border-radius: 2em;}

// Hiding //
.hide {display: none !important;}

// Responsive //
@media (min-width: 801px) {
    .mobileonly {display: none !important;}
    p.description {max-width: 0.666%; margin: auto;}
    ::-webkit-scrollbar {width: 1em;}
    ::-webkit-scrollbar-track {background: #111d;}
    ::-webkit-scrollbar-thumb {background: #fff; box-shadow: inset 0 0 6px #0004;}
}
@media (max-width: 800px) {
    .desktoponly {display: none !important;}
}

// Google //
.adsbygoogle {margin-top: 3em; max-width: 100%;}

/* Copyright © Nixinova 2020 */
