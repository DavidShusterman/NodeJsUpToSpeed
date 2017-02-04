var mongodb = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {

    var getIndex = function (req, res) {
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function (err, results) {
                res.render('bookListView', {
                    title: "Books",
                    nav: nav,
                    books: results
                });
            });
        });
    };
    var getById = function (req, res) {
        var id = new objectID(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.findOne({
                _id: id
            }, function (err, results) {
                res.render('bookView', {
                    title: "Book",
                    nav: nav,
                    book: results
                });
            });
        });
    };
    var middleware = function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    };
    return {
        getIndex: getIndex,
        getById: getById,
        middleware:middleware
    };
};

module.exports = bookController;