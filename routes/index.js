const express = require('express');

const router = express.Router();
const domain = require('domain');

router.use('/details', require('./details'));

// GET index
router.get('/', (req, res) => {
    const d = domain.create();

    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        res.render('index', { title: 'Drone Parts' });
    });
});

router.get('/parts', (req, res) => {
    const d = domain.create();

    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        res.render('parts', { title: 'Drone Parts' });
    });
});

router.get('/newpart', (req, res) => {
    const d = domain.create();

    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        res.render('newpart', { title: 'New Part' });
    });
});

module.exports = router;
