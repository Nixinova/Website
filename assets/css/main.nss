@var body color = linear-gradient(135deg, #333, #111)
@var header color = #222
@var header height = 82px
@var footer height = 72px
@var main height = calc( 100vh - $(footer height) )

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

// Header //
#header {background: $(header color); height: $(header height); display: flex; border-bottom: 2px solid white;}
    & .fas {cursor: pointer;}
    &-search, #menu-icon {width: 80px; padding: 25px; color: white; cursor: pointer; z-index: 10;}
    &-search a, #menu-icon a {color: white;}
    & #menu-logo {margin: auto;}
        % img {max-height: 80px;}

nav {background: $(body color); opacity: .9; position: absolute; height: 100vh; padding: 1em; line-height: 2; overflow: auto;}
    & * div {transition: 0.1s;}
    & ul {margin: 0 1em; padding: 0; list-style-type: none;}
    & a[href] {color: #fff;}
        %:hover {opacity: 1;}
    & .menu-section {margin: 0 auto 1em;}
    & .menu-header {display: block; font-weight: bold; font-size: 1.4em; text-align: center; text-transform: uppercase;}
    & .menu-subheader {margin-top: 6px; display: inline-block; font-size: 1.1em; font-weight: bold;}
$(@breakpoint | 600px | nav | padding-bottom: 10em; width: 100%; overflow: scroll; | border-right: 2px solid white; )

// Footer //
footer {width: 100%; padding: 15px; background: $(header color); margin-top: 12px; border-top: 2px solid #fff; text-align: center;}
    & ul {margin: 0;}
    & li {display: inline; white-space: nowrap;}
        %:not(:empty):not(:first-child)::before {content: ' • ';}

// Headings //
h1, h2, h3, h4 {text-transform: uppercase;}
    &, h5, h6 {margin: 0; color: #eee; font-weight: bold; text-align: center;}
h2.section-header {margin-top: 0.8em; margin-bottom: 0.5em;}
    &::after {content: ""; display: block; width: 15vw; height: 2px; margin-left: calc(50% - 7.5vw); background: #fff; transition: 1s;}
    &:hover::after {width: 20vw; margin-left: calc(50% - 10vw);}
$(@repeat | 5 | h$i {font-size: 3em - $i/3;})

// Links //
a {text-decoration: none; cursor: pointer;}
a[href] {color: #acf; transition: 0.2s;}
a:hover {opacity: 0.5;}
a.hover-underline {display: block;}
    &::after {content: ""; display: block; width: 0; height: 2px; background: #fff; color: #fff; transition: 0.4s;}
        :hover > % {width: 5em;}

// Tables //
table.styled th, table.styled td {border: 1px solid #555; padding: 0.2em 0.4em;}

// Lists //
.columns-list {display: flex; flex-wrap: wrap;}
.columns-list li {margin-left: 2em;}

// Centering //
.centered {display: flex; flex-flow: column; align-self: center; align-items: center;}

// Dividers //
hr.half {width: 50%;}
hr.divider {width: 90%;}

// Videos //
iframe.youtube {width: 80vw; height: 45vw; max-width: 960px; max-height: 540px;}

// Galleries //
#gallery {width: 100%; margin-bottom: 1em;}
    & .screenshot {display: flex; height: 75/16*10vh; border-bottom: 2px solid #fff; background: #333 center/cover; background-blend-mode: overlay;}
        % > * {margin: auto;}

// Buttons //
button {background: #19f; color: #fff; padding: 12px 30px; cursor: pointer; font-size: 20px; border: none; border-radius: 0.5em;}
    &:hover {background: #08f; transition: 0.25s;}
    &.download {margin: 0; border-radius: 2em;}

// Hiding //
.hide {display: none !important;}

// Responsive //
@media (max-width: 800px) {
    .desktoponly {display: none !important;}
}
@media (min-width: 801px) {
    .mobileonly {display: none !important;}
    p.description {max-width: 66.67%; margin: auto;}
    ::-webkit-scrollbar {width: 1em;}
        &-track {background: #111d;}
        &-thumb {background: #fff; box-shadow: inset 0 0 6px #0004;}
}

// Google //
.adsbygoogle {margin-top: 3em; max-width: 100%;}

/* Copyright © Nixinova 2020 */