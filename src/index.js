"use strict";
exports.__esModule = true;
var books_resolver_1 = require("./books-resolver");
console.log('test2', books_resolver_1.getBooks);
var books = (0, books_resolver_1.getBooks)();
books.then(function (books) {
    console.log(books[0]);
});
