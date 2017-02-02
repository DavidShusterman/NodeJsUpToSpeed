var bodyParser = require('body-parser');
var express = require('express');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');


var app = express();
var port = process.env.PORT || 3000;
var nav = [{
    Link: '/Books',
    Text: "Books"
}, {
    Link: '/Authors',
    Text: 'Authors'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({secret:'library'}));
require('./src/config/passport')(app);


app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);



app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
        title: "David's App",
        nav: [{
            Link: '/Books',
            Text: "Books"
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});