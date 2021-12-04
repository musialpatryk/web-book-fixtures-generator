"use strict";
exports.__esModule = true;
exports.getBooks = void 0;
var helpers_1 = require("./helpers");
var request = require('request');
var bookParser = function (item, index) {
    var volumeInfo = item.volumeInfo;
    return {
        model: 'books.book',
        pk: index,
        fields: {
            created: "2021-11-20T14:43:17.854Z",
            updated: "2021-11-20T14:43:17.854Z",
            title: volumeInfo.title,
            description: volumeInfo.description,
            rating: 5.0,
            pages: volumeInfo.pageCount || 0,
            slug: (0, helpers_1.slugify)(volumeInfo.title),
            publishDate: (0, helpers_1.getDate)(volumeInfo.publishedDate),
            status: 'A',
            authors: [3],
            genre: [1]
        }
    };
};
var getBooks = function () {
    console.log('test');
    return new Promise(function (resolve, reject) {
        request('https://www.googleapis.com/books/v1/volumes?q=it&langRestrict=pl&maxResults=40', { json: true }, function (err, res, body) {
            if (err) {
                return reject(err);
            }
            try {
                var path = '0003_Books.json', mappedItems = res.body.items.map(function (item, index) {
                    return bookParser(item, index);
                });
                console.log(mappedItems.length);
                var jsonContent = JSON.stringify(mappedItems);
                (0, helpers_1.save)(path, jsonContent);
                resolve(mappedItems);
            }
            catch (e) {
                reject(e);
            }
        });
    });
};
exports.getBooks = getBooks;
