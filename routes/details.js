const express = require('express');
const router = express.Router();
const domain = require('domain');

router.get('/', function(req, res) {
    const d = domain.create();

    d.on('error', function(error) {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        res.render('newPart', { detailsType: 'New', title: 'Details' });
    });
});

router.get('/:id', function(req, res) {
    const d = domain.create();

    d.on('error', function(error) {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        res.render('details', { id: req.params['id'], title: 'Details' });
    });
});

module.exports = router;
