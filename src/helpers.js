"use strict";
exports.__esModule = true;
exports.getDate = exports.slugify = exports.save = void 0;
var fs = require('fs');
var save = function (path, itemsString) {
    fs.writeFile(path, itemsString, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
};
exports.save = save;
var slugify = function (text) {
    return text.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    ;
};
exports.slugify = slugify;
var getDate = function (date) {
    if (!date) {
        return '2021-11-20T14:43:17.854Z';
    }
    switch (date.length) {
        case 4: {
            return date + '-01-01T14:43:17.854Z';
        }
        case 7: {
            return date + '-01T14:43:17.854Z';
        }
    }
};
exports.getDate = getDate;
