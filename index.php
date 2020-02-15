<!DOCTYPE html>
<html>
<head>
    <style class="page-styles">
        
        :root {--blue: linear-gradient(#08e, #15c); scroll-behavior: smooth;}
        body {background: var(--blue); overflow-x: hidden;}
        main {margin-top: 0;}
        footer {margin-top: -3px;}
        
        /* Image */
        #image-container {background: var(--blue); display: flex; height: 100vh; width: 100vw; margin-top: calc(var(--header-height)*-1); text-align: center;}
        #image-container img {max-width: 50%; filter: brightness(0) invert(1); font-size: 10.4vw; font-family: 'Valken';}
        
        /* Down arrow */
        #down-arrow {position: absolute; bottom: 0; width: 100%; text-align: center; font-size: 5em;}
        #down-arrow a {color: #eee;}
        #down-arrow a i {font-size: 1em; visibility: hidden;}

        /* Showcase */
        #showcase {background: #222; text-align: center;}
        #showcase ul {padding-left: 0; list-style-type: none;}
        #showcase a {border-bottom: solid; color: #222;}
        #showcase .title {background: #222; color: #eee;}
        #showcase .contents {background: #eee; color: #222;}

        @media (min-width: 1051px) {
            #showcase {display: grid; font-size: 4em; grid-template-areas: "maps-title maps-contents"
                "tools-contents tools-title" "rp-title rp-contents" "apis-contents apis-title";}
            #showcase div {padding: calc(25vw - var(--height)) 0;}
        }

        @media (max-width: 1050px) {
            #showcase {font-size: 3em;}
            #showcase div {padding: 1em 0;}
            #showcase ul {margin-block-start: 0; margin-block-end: 0;}
        }

    </style>
</head>
<body>
    <script id="page-loader-script">
        var PAGE_DATA = {
            title: "",
            description: `The personal website of Nixinova, containing command generation and coordinate tools for
                Minecraft, APIs for generation information from Hytale blog posts, and downloads of Minecraft maps and
                resource packs created by Nixinova.`,
            keywords: "nixinova,herobrinenzk,nixinova website,nixinova.com",
            stylesheets: ["main.css"],
            scripts: []
        }
        $(document).ready(function() {loadData(PAGE_DATA);});
    </script>

    <main>

        <div id="image-container" class="section">
            <div style="margin: auto 0;">
                <img src="/assets/images/nixinova.png" alt="&thinsp;NIXINOVA" onmousedown="return false;">
            </div>
        </div>

        <div id="showcase">
            
            <div class="title" style="grid-area: maps-title; --height: 136px;">
                <strong>Minecraft<br>Maps</strong>
            </div>
            <div class="contents" style="grid-area: maps-contents; --height: 243px;">
                <ul>
                    <li><a href="/downloads/minecraft/maps/skywars">SkyWars</a></li>
                    <li><a href="/downloads/minecraft/maps/kitpvp">KitPvP</a></li>
                    <li><a href="/downloads/minecraft/maps/musical-blocks">Musical&nbsp;Blocks</a></li>
                </ul>
            </div>

            <div class="title" style="grid-area: tools-title; --height: 136px;">
                <strong>Minecraft<br>Tools</strong>
            </div>
            <div class="contents" style="grid-area: tools-contents; --height: 243px;">
                <ul>
                    <li><a href="/tools/minecraft/commands/give">/give</a></li>
                    <li><a href="/tools/minecraft/commands/summon">/summon</a></li>
                    <li><a href="/tools/minecraft/converters/coordinates">Coordinates</a></li>
                </ul>
            </div>

            <div class="title" style="grid-area: rp-title; --height: 136px;">
                <strong>Minecraft<br>Resource Packs</strong>
            </div>
            <div class="contents" style="grid-area: rp-contents; --height: 243px;">
                <ul>
                    <li><a href="/downloads/minecraft/resource-packs/mash-up">Mash-Up</a></li>
                    <li><a href="/downloads/minecraft/resource-packs/themed">Themed</a></li>
                    <li><a href="/downloads/minecraft/resource-packs/herobrinenzk">HeroBrineNZK</a></li>
                </ul>
            </div>

            <div class="title" style="grid-area: apis-title; --height: 55px;">
                <strong>APIs</strong>
            </div>
            <div class="contents" style="grid-area: apis-contents; --height: 162px;">
                <ul>
                    <li><a href="/tools/hytale/api/blog">Hytale Blog</a></li>
                    <li><a href="/tools/minecraft/api/player">Minecraft Player</a></li>
                </ul>
            </div>

        </div>

    </main>
</body>
</html>
