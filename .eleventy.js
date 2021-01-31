const { exec } = require('child_process');

module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addWatchTarget("assets");

    eleventyConfig.on('afterBuild', () => {
        exec('npm run novasheets', (err, stdout, stderr) => console.log(err || stdout));
    });

    return {
        passthroughFileCopy: true,
        dir: {
            includes: "assets/imports",
            layouts: "assets/imports/layouts"
        }
    };

}
