const { execSync: exec } = require('child_process');

module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy({"meta": "."});
    eleventyConfig.addWatchTarget("assets");

    eleventyConfig.addCollection("pages", collection => {
        return collection.getFilteredByGlob("pages/*/*");
    });

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
