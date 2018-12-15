const express = require('express');
const router = express.Router();
const domain = require('domain');

router.use('/details', require('./details'));

// GET index
router.get('/', function(req, res) {
    const d = domain.create();

    d.on('error', function(error) {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        res.render('index', { title: 'Drone Parts' });
    });
});

router.get('/parts', function(req, res) {
    const d = domain.create();

    d.on('error', function(error) {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        res.render('parts', { title: 'Drone Parts' });
    });
});

router.get('/newpart', function(req, res) {
    const d = domain.create();

    d.on('error', function(error) {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        res.render('newpart', { title: 'New Part' });
    });
});

module.exports = router;
