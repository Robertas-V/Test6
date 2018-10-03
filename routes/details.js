var express = require('express'),
    router = express.Router(),
    domain = require('domain');

//
// router.get('/details', function(req, res, next) {
//    res.render('details', { title: 'Details'});
// });

router.get('/:id', function(req, res, next) {
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        res.render('details', { id: req.params['id'], title: 'Details'});
    });
});

// router.get('/', function(req, res, next) {
//     var d = domain.create();
//
//     d.on('error', function(error){
//         console.log(error.stacktrace);
//         res.status(500).send({'error': error.message});
//     });
//
//     d.run(function(){
//         res.render('details', { id: req.params['id'], title: 'Details'});
//     });
// });

// router.get('/details/:id', function(req, res, next) {
//     var d = domain.create();
//
//     d.on('error', function(error){
//         console.log(error.stacktrace);
//         res.status(500).send({'error': error.message});
//     });
//
//     d.run(function(){
//         res.render('details', { id: req.params['id'], title: 'Details'});
//     });
// });

module.exports = router;
