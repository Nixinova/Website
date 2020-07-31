// Font //
@font-face {font-family: 'Minecraft'; src: local('Minecraft'), url('/assets/fonts/minecraft.ttf') format('truetype');}

// Base styles //
form p {text-align: left; line-height: 3;}
h2:not(.upper) {text-transform: lowercase;}
$(@breakpoint | 900px | main | margin-left: 1em; )
$(@breakpoint | 815px | form, output, .content || max-width: 825px; margin: 0 auto; )

// Buttons //
button {padding: 7px 10px; font-size: inherit; border-radius: 5px;}
    &.on  {background: #5c5;}
    &.off {background: #f55;}
    &.notext {width: 70px; text-align: center;}
    &.notext.on::before {content: 'True';}
    &.notext.off::after {content: 'False';}
    &.reset {padding: 20px; margin: 0 50px; border: none; border-radius: 5em; cursor: pointer; font: 2em 'Passion One';}

// Inputs //
input, select {width: 160px;}
    &, button {padding: 5px 10px; margin-top: 10px; display: inline-block; border: none; border-radius: 4px;}
input:out-of-range {border: 2px solid red; background: #fdd;}
input[type="submit"] {width: 100%; background: #94c0c4; padding: 14px 20px; margin: 8px 0px; border: none;
    border-radius: 4px; cursor: pointer; color: #333; font: normal 2em 'Passion One'; text-align: center;}
    &:hover {box-shadow: 0px 10px 14px -5px #3338;}
input[type="number"] {width: 70px;}
    &.long {width: 110px;}
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
.indent {margin: 0 20px;}
p.indent, div.indent {margin: -13px 0 -13px 20px;}
p.negative {margin-top: -15px;}

$(@breakpoint | 815px |
    .mobile-spacer {margin-left: 20px;}
|
    span.set-width {display: inline-block; width: var(--width);}
    label {display: inline-block; width: 125px;}
        &.short {margin-left: 15px; width: 100px;}
        &.long {width: 250px;}
)

// Minecraft color codes //
@var color code = color: $[1]; text-shadow: 1px 1px $[2];
.§0 {$(color code|#000|#000000)}
.§1 {$(color code|#00a|#00002a)}
.§2 {$(color code|#0a0|#002a00)}
.§3 {$(color code|#0aa|#002a2a)}
.§4 {$(color code|#a00|#2a0000)}
.§5 {$(color code|#a0a|#2a002a)}
.§6 {$(color code|#fa0|#2a2a00)}
.§7 {$(color code|#aaa|#2a2a2a)}
.§8 {$(color code|#555|#151515)}
.§9 {$(color code|#55f|#15153f)}
.§a {$(color code|#5f5|#153f15)}
.§b {$(color code|#5ff|#153f3f)}
.§c {$(color code|#f55|#3f1515)}
.§d {$(color code|#f5f|#3f153f)}
.§e {$(color code|#ff5|#3f3f15)}
.§f {$(color code|#fff|#3f3f3f)}
.§k {}
.§l {font-weight: bold;}
.§m {text-decoration: line-through;}
.§n {text-decoration: underline;}
.§o {font-style: italic;}
.§r {$(color code|#fff|#3f3f3f); font-weight: normal; text-decoration: none; font-style: normal;}
.§m.§n {text-decoration: underline line-through;}

/* Copyright © Nixinova 2020 */