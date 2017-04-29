const glob = require('glob');

exports.registerRoutes = (app) => {
    const files = glob.sync("./server/routes/**/*.js");
    files.forEach((filePath) => {
        const path = filePath.replace(/^.\/server\//, '.\/').replace(/.js$/, '');
        app.use('/api', require(path));
    })
}

exports.getPagination = (pageSize, pageCount) => {
    const page = parseInt(pageSize) - 1;
    const count = parseInt(pageCount);
    const start = page * count;
    const end = start + count;
    return { start, end };
}

exports.getById = (data, id) => {
    return data.find(t => t.id === id);
}

exports.deleteById = (data, id) => {
    return data.filter(t => t.id !== id);
}

exports.setModelData = (data, body) => {
    Object.keys(body).forEach((key) => {
        data[key] = body[key];
    })
}