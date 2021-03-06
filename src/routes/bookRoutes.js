var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID;


var router = function (nav) {
    var bookController = require('../controllers/bookController')(null,nav);
    bookRouter.use(function(req,res,next){
        if(!req.user){
            res.redirect('/');
        }
        next();
    });

    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getIndex);
    return bookRouter;
};
module.exports = router;