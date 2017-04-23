const glob = require('glob');

exports.registerRoutes = function (app) {
    const files = glob.sync("./server/routes/**/*.js");
    files.forEach((filePath) => {
        const path = filePath.replace(/^.\/server\//, '.\/' ).replace(/.js$/, '');
        app.use('/api', require(path));
    })
}