const express = require('express');

const router = express.Router();
const domain = require('domain');

router.get('/', (req, res) => {
    const d = domain.create();

    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        res.render('newPart', { detailsType: 'New', title: 'Details' });
    });
});

router.get('/:id', (req, res) => {
    const d = domain.create();

    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        res.render('details', { id: req.params.id, title: 'Details' });
    });
});

module.exports = router;
