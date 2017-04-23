var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function () {
    return nodemon({
        script: 'server/app.js',
        watch: 'server/*',
        delay: 1000
    })
    .on('restart', function () {
        setTimeout(function () {
            // TODO: reload browser
        }, 1000);
    });
});
