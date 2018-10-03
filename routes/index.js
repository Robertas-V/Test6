var express = require('express'),
    router = express.Router(),
    domain = require('domain');

router.use('/details', require('./details'));

// GET index
router.get('/', function(req, res, next) {
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
       res.render('index', { title: 'Drone Parts'});
    });
});

router.get('/parts', function(req, res, next) {
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });


    d.run(function(){
        res.render('parts', { title: 'Drone Parts'});
    });
});

router.get('/newpart', function(req, res, next) {
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });


    d.run(function(){
        res.render('newpart', { title: 'New Part'});
    });
});


// Router.get('/details/:id', function(req, res, next) {
//     var d = domain.create();
//     // console.log('Viduje puslapio');
//     // console.log(req.params);
//
//     d.on('error', function(error){
//         console.log(error.stacktrace);
//         res.status(500).send({'error': error.message});
//     });
//
//     d.run(function(){
//         res.render('details');
//     });
// });

module.exports = router;
