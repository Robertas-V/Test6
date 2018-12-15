const express = require('express');
const router = express.Router();
const domain = require('domain');
const fruitDAO = require('./../../../model/DAO/fruitDAO');

//CREATE a new fruit
router.post('/', function(req, res) {
    const d = domain.create();

    d.on('error', function(error) {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        fruitDAO.createFruit(
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            },
            {
                success: function(f) {
                    res.status(201).send({
                        msg: 'Fruit created successfully: ' + req.body.name,
                        data: f
                    });
                },
                error: function(err) {
                    res.status(500).send(err);
                }
            }
        );
    });
});

//READ all fruits
router.get('/', function(req, res) {
    const d = domain.create();
    const skip = req.query.skip;
    const count = req.query.count;

    d.on('error', function(error) {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        fruitDAO.readFruits(skip, count, {
            success: function(fruits) {
                res.status(200).send(JSON.stringify(fruits));
            },
            error: function(err) {
                res.status(500).send(err);
            }
        });
    });
});

//READ fruit by id
router.get('/:id', function(req, res) {
    const d = domain.create();
    d.on('error', function(error) {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        fruitDAO.readFruitById(req.params.id, {
            success: function(fruit) {
                res.status(200).send(JSON.stringify(fruit));
            },
            error: function(err) {
                res.status(404).send(err);
            }
        });
    });
});

//UPDATE fruit
router.put('/:id', function(req, res) {
    const d = domain.create();
    d.on('error', function(error) {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        fruitDAO.updateFruit(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            },
            {
                success: function(f) {
                    res.status(200).send({
                        msg: 'Fruit updated successfully: ' + JSON.stringify(f),
                        data: f
                    });
                },
                error: function(err) {
                    res.status(500).send(err);
                }
            }
        );
    });
});

//DELETE fruit
router.delete('/:id', function(req, res) {
    const d = domain.create();
    d.on('error', function(error) {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        fruitDAO.deleteFruit(req.params.id, {
            success: function(f) {
                res.status(200).send({
                    msg: 'Fruit deleted successfully: ' + req.params.id,
                    data: f
                });
            },
            error: function(err) {
                res.status(500).send(err);
            }
        });
    });
});

module.exports = router;
