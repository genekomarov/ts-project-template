// Константы gulp
const {src, dest, series} = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');

// Константы yargs
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

// Константы проекта
const tsProject = ts.createProject('tsconfig.json');
const destination = 'bin';

function buildFile() {
    if (argv.file && typeof argv.file === 'string') {
        const file = argv.file;
        return src(file)
            .pipe(tsProject()).js
            .pipe(dest(destination));
    }
}

function clear() {
    return del([destination + '/**', './index.js']);
}

function buildAll() {
    return tsProject.src()
        .pipe(tsProject()).js
        .pipe(dest(destination));
}

const clearAndBuildAll = series(clear, buildAll);

module.exports = {
    clearAndBuildAll, buildAll, buildFile, clear
};