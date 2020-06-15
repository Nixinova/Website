// Font //
@font-face {font-family: 'Minecraft'; src: local('Minecraft'), url('/assets/fonts/minecraft.ttf') format('truetype');}

// Base styles //
form p {text-align: left; line-height: 3;}
h2:not(.upper) {text-transform: lowercase;}

@media (min-width: 815px) {
    form, output, .content {max-width: 825px; margin: 0 auto;}
}

// Buttons //
button {padding: 7px 10px; font-size: inherit; border-radius: 5px;}
button.on  {background: #5c5;}
button.off {background: #f55;}
button.notext {width: 70px; text-align: center;}
button.notext.on::before {content: 'True';}
button.notext.off::after {content: 'False';}
button.reset {padding: 20px; margin: 0 50px; border: none; border-radius: 5em; cursor: pointer; font: 2em 'Passion One';}

// Inputs //
input, select, button {padding: 5px 10px; margin-top: 10px; display: inline-block; border: none; border-radius: 4px;}
input, select {width: 160px;}
input:out-of-range {border: 2px solid red; background: #fdd;}
input[type="submit"] {width: 100%; background: #94c0c4; padding: 14px 20px; margin: 8px 0px; border: none;
    border-radius: 4px; cursor: pointer; color: #333; font: normal 2em 'Passion One'; text-align: center;}
input[type="submit"]:hover {box-shadow: 0px 10px 14px -5px #3338;}
input[type="number"] {width: 70px;}
input[type="number"].long {width: 110px;}
input[type="color"] {padding: 1px;}
textarea {transition: none; padding: 2px 6px; margin: 10px 0; border-radius: 4px;}

// Dropdown icons //
.elipsis, .plus, .minus, .clear {margin-left: 10px; font-size: 95%; background: #eee; border-radius: 20px; animation: none;}
.elipsis, .clear {padding: 5px  8px;}
.plus, .minus {padding: 5px 10px;}
.plus::before {content: '+';}
.minus::before {content: '−';}
.elipsis::before {content: '⋯';}
.clear::before {content: '🞩';}
a.elipsis, a.plus, a.minus, a.clear {color: #222; transition: 0s;}

// Output //
#preview-text {padding: 5px 10px; font-family: Minecraft; background-color: #100110e9; border: 3px solid #205e; border-radius: 5px;}
.command {
    display: block; margin: 0 auto 2em; padding: 5px 1em; width: 100%; border: solid #aaa 1px; border-radius: 5px;
    color: #aaa; font-family: monospace; word-break: break-all;
}

// Indentation //
p.indent, div.indent {margin: -13px 0 -13px 20px;}
p.negative {margin-top: -15px;}
.indent {margin: 0 20px;}

@media (max-width: 900px) {
    main {margin-left: 1em;}
}

@media (min-width: 815px) {
    span.set-width {display: inline-block; width: var(--width);}
    label {display: inline-block; width: 125px;}
    label.short {margin-left: 15px; width: 100px;}
    label.long {width: 250px;}
}

@media (max-width: 814px) {
    .mobile-spacer {margin-left: 20px;}
}

// Minecraft color codes //
@var color code | color | bgcolor
    color: $[color]; text-shadow: 1px 1px $[bgcolor];
@endvar
.§0 {$(color code|color=#000|bgcolor=#000000)}
.§1 {$(color code|color=#00a|bgcolor=#00002a)}
.§2 {$(color code|color=#0a0|bgcolor=#002a00)}
.§3 {$(color code|color=#0aa|bgcolor=#002a2a)}
.§4 {$(color code|color=#a00|bgcolor=#2a0000)}
.§5 {$(color code|color=#a0a|bgcolor=#2a002a)}
.§6 {$(color code|color=#fa0|bgcolor=#2a2a00)}
.§7 {$(color code|color=#aaa|bgcolor=#2a2a2a)}
.§8 {$(color code|color=#555|bgcolor=#151515)}
.§9 {$(color code|color=#55f|bgcolor=#15153f)}
.§a {$(color code|color=#5f5|bgcolor=#153f15)}
.§b {$(color code|color=#5ff|bgcolor=#153f3f)}
.§c {$(color code|color=#f55|bgcolor=#3f1515)}
.§d {$(color code|color=#f5f|bgcolor=#3f153f)}
.§e {$(color code|color=#ff5|bgcolor=#3f3f15)}
.§f {$(color code|color=#fff|bgcolor=#3f3f3f)}
.§k {}
.§l {font-weight: bold;}
.§m {text-decoration: line-through;}
.§n {text-decoration: underline;}
.§o {font-style: italic;}
.§r {$(color code|color=#fff|bgcolor=#3f3f3f); font-weight: normal; text-decoration: none; font-style: normal;}
.§m.§n {text-decoration: underline line-through;}

/* Copyright © Nixinova 2020 */
