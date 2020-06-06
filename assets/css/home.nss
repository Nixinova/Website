@var blue
    background: linear-gradient(#08e, #15c)l
---
@font-face {font-family: 'Valken'; src: local('Valken'), url('/assets/fonts/valken.ttf') format('truetype');}

html {scroll-behavior: smooth;}
body {$(bluebg); overflow-x: hidden;}
main {padding-top: 0;}
footer {margin-top: 0;}
a[href]:hover {opacity: 1;}

.shaded {$(bluebg);}

h2::before, h2::after {content: ""; display: block; width: 50%; height: 2px; margin-left: 25%; background: #fff;}

.showcase-container {display: flex; height: 100vh; width: 100vw; border-top: 2px solid; text-align: center;}
.showcase-container div {margin: auto;}
.showcase-container p {max-width: 80%; margin: auto; font-size: 1.2em;}
.showcase-container img {max-width: 50%; filter: brightness(0) invert(1); font-size: 10.4vw; font-family: 'Valken';}
.showcase-container hr {width: 50%;}
.showcase-container h2 {font-size: 8vh; line-height: 1.3;}
.showcase-container ul {padding-left: 0; list-style-type: none; font-size: 2.5em;}
.showcase-container li a {color: #eee;}
.image-background {background: fixed #333 center; background-blend-mode: overlay; background-size: cover;}

@media (min-width: 900px) {
    .content-container {display: flex;}
    .content-container .title {width: 50vw;}
    .content-container .contents {width: 40vw; text-align: left;}
}