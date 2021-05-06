// Константы gulp
const gulp = require('gulp');
const ts = require('gulp-typescript');

// Константы yargs
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

// Константы проекта
const tsProject = ts.createProject('tsconfig.json');
const destination = 'bin';

function build() {
    if (argv.file && typeof c === 'string') {
        const file = argv.file;
        return gulp.src(file)
            .pipe(tsProject()).js
            .pipe(gulp.dest(destination));
    }
    console.log(argv.file);
    return tsProject.src()
        .pipe(tsProject()).js
        .pipe(gulp.dest(destination));
}

module.exports.build = build;