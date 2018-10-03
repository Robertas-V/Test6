var express = require('express'),
    domain = require('domain'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    i18n = require("i18next"),
    bodyParser = require('body-parser');

var routes = require('./routes/index');
var routesDetails = require('./routes/details');
var userAPI = require('./routes/api/0.1/userAPI');
var fruitAPI = require('./routes/api/0.1/fruitAPI');
var dronePartAPI = require('./routes/api/0.1/dronePartAPI');

var dom = domain.create(),
    app = express();

//i18n init
i18n.init({ lng: 'en-US' }, function(err, t) {
    if(err)
        console.log(err);
});
i18n.setLng('en-US', function(err, t) {
    if(err)
        console.log(err);
});
app.use(i18n.handle);
i18n.registerAppHelper(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.info('Environment: ' + app.get('env'));

app.use(require('./routes'));
//app.use('/', routes);
//app.use('/details', routesDetails);
app.use('/api/0.1/user', userAPI);
app.use('/api/0.1/fruit', fruitAPI);
app.use('/api/0.1/dronePart', dronePartAPI);

// error handlers
app.use(function(error, req, res, next){
    if(domain.active){

        res.render('error', {
            message: 'domain.active',
            error: error
        });
        domain.active.emit('error', error);
    }else{

        // development error handler
        // will print stacktrace

        app.use(function(err, req, res, next) {
          console.info('Error handler 3');
          res.status(err.status || 500);
          res.render('error', {
              message: err.message,
              error: ( app.get('env') === 'development' ? err : {} )
          });
        });
    }
});

//DEFAULT ERROR HANDLER
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.render('error', {
        message: 'Ooops!',
        error: {status: 'Page not found!' }
    });
});

module.exports = app;
