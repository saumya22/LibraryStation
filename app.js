require('./db');
var express = require('express');
var routes = require('./routes');
var http = require('http');
var io = require('socket.io');
var path = require('path');
var favicon = require('serve-favicon');
var nodemailer = require("nodemailer");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var heartbeats = require('heartbeats');
var debug = require('debug')('LibraryStation');
var authController = require('./controller/auth');


var routes = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');
var storebooks = require('./routes/storebooks');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views/'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());


var router = express.Router();

app.param('username', function(req, res, next, username) {

    console.log('doing name validations on ' + username);

    req.body.username = username;
    next(); 
});


app.use('/',routes);
app.use('/api', routes);
app.use('/api/users', users);
app.use('/api/users/:username/books', books)
app.use('/api/users/:username/storebooks', storebooks)

app.get("/", function(req, res) {
    res.render('index', {title: 'Login'});
});

var smtpTransport = nodemailer.createTransport({
service: "Gmail",
auth: {
user: "librarystationnoreply@gmail.com",
pass: "library101"
}
});

app.get('/send',function(req,res){

var mailOptions={
    from: 'Library Station',
    to : req.query.to,
    subject : req.query.subject,
    text : req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
    console.log(error);
    res.end("error");
    }else{
    console.log("Message sent: " + response.message);
    res.end("sent");
    }
    });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    var socket = io.listen(server);

    socket.on('connection', function(socket) {
        var heart = heartbeats.createHeart(1000);
        heart.createEvent(5, function(heartbeat, last){
            socket.emit('welcome', {message: "The server's heart is beating successfully, Please check after 5 seconds, " + Date()});
        });
    });
    debug('Express server listening on port ' + server.address().port);
});


module.exports = app;

