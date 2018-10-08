var express = require('express'),
    router = express.Router(),
    domain = require('domain');

router.get('/', function(req, res, next) {
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        res.render('newPart', { detailsType: 'New', title: 'Details'});
    });
});


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

module.exports = router;
