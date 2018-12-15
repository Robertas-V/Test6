const express = require('express');
const domain = require('domain');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const i18n = require('i18next');
const bodyParser = require('body-parser');

// var routes = require('./routes/index');
const userAPI = require('./routes/api/0.1/userAPI');
const fruitAPI = require('./routes/api/0.1/fruitAPI');
const dronePartAPI = require('./routes/api/0.1/dronePartAPI');

const app = express();

// i18n init
i18n.init({ lng: 'en-US' });
i18n.setLng('en-US');

app.use(i18n.handle);
i18n.registerAppHelper(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// var multer = require('multer');
//
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         console.log("aha " + file.originalname);
//         cb(null, file.originalname)
//     }
// });
//
// var upload = multer().single('images');
//
// app.use(multer({
//      storage:storage
//    }).single('images'));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes'));

app.use('/api/0.1/user', userAPI);
app.use('/api/0.1/fruit', fruitAPI);
app.use('/api/0.1/dronePart', dronePartAPI);

// error handlers
app.use((error, req, res) => {
    if (domain.active) {
        res.render('error', {
            message: 'domain.active',
            error
        });
        domain.active.emit('error', error);
    } else {
        // development error handler
        // will print stacktrace

        app.use((err, _, innerReq) => {
            console.info('Error handler 3');
            innerReq.status(err.status || 500);
            innerReq.render('error', {
                message: err.message,
                error: app.get('env') === 'development' ? err : {}
            });
        });
    }
});

// DEFAULT ERROR HANDLER
// catch 404 and forward to error handler
app.use((req, res) => {
    res.render('error', {
        message: 'Oops!',
        error: { status: 'Page not found!' }
    });
});

module.exports = app;
