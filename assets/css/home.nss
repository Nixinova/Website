@font-face {font-family: 'Valken'; src: local('Valken'), url('/assets/fonts/valken.ttf') format('truetype');}

html {scroll-behavior: smooth;}
body {background: linear-gradient(135deg, #14a, #15d); overflow-x: hidden;}
main {padding-top: 0;}
footer {margin-top: 0;}

h2::before, h2::after {content: ""; display: block; width: 50%; height: 2px; margin-left: 25%; background: #fff; transition: 0.7s;}
h2:hover::before, h2:hover::after {width: 60%; margin-left: 20%;}
a[href]:hover {opacity: 1;}

#nixinova {background: $<body><background>;}
#nixinova img {position: absolute; max-width: 50%; filter: brightness(0) invert(1); font-size: 10.4vw; font-family: 'Valken';}
#nixinova-news {background: radial-gradient(#235d8e, #261b80);}
#nixinova-news img:hover {opacity: 0.6; transition: 0.2s;}
#projects {background-image: linear-gradient(45deg, #4c60d0, #d967ec);}

.showcase-container {display: flex; height: 100vh; width: 100vw; border-top: 2px solid; text-align: center;}
    & hr {width: 50%;}
    & h2 {font-size: 8vh;}
    & ul {padding-left: 0; list-style-type: none; font-size: 2.5em;}
    & li a {color: #eee;}
.content-container div {margin: auto;}
.image-background {background: fixed #333 center; background-blend-mode: overlay; background-size: cover;}

$(@breakpoint | 900px ||
    .content-container {display: flex;}
        & .title {width: 50vw;}
        & .contents {width: 40vw; text-align: left;}
)
