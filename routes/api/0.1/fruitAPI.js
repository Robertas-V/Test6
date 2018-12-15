const express = require('express');

const router = express.Router();
const domain = require('domain');
const fruitDAO = require('./../../../model/DAO/fruitDAO');

// CREATE a new fruit
router.post('/', (req, res) => {
    const d = domain.create();

    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        fruitDAO.createFruit(
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            },
            {
                success(f) {
                    res.status(201).send({
                        msg: `Fruit created successfully: ${req.body.name}`,
                        data: f
                    });
                },
                error(err) {
                    res.status(500).send(err);
                }
            }
        );
    });
});

// READ all fruits
router.get('/', (req, res) => {
    const d = domain.create();
    const { skip, count } = req.query;

    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        fruitDAO.readFruits(skip, count, {
            success(fruits) {
                res.status(200).send(JSON.stringify(fruits));
            },
            error(err) {
                res.status(500).send(err);
            }
        });
    });
});

// READ fruit by id
router.get('/:id', (req, res) => {
    const d = domain.create();
    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        fruitDAO.readFruitById(req.params.id, {
            success(fruit) {
                res.status(200).send(JSON.stringify(fruit));
            },
            error(err) {
                res.status(404).send(err);
            }
        });
    });
});

// UPDATE fruit
router.put('/:id', (req, res) => {
    const d = domain.create();
    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        fruitDAO.updateFruit(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            },
            {
                success(f) {
                    res.status(200).send({
                        msg: `Fruit updated successfully: ${JSON.stringify(f)}`,
                        data: f
                    });
                },
                error(err) {
                    res.status(500).send(err);
                }
            }
        );
    });
});

// DELETE fruit
router.delete('/:id', (req, res) => {
    const d = domain.create();
    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        fruitDAO.deleteFruit(req.params.id, {
            success(f) {
                res.status(200).send({
                    msg: `Fruit deleted successfully: ${req.params.id}`,
                    data: f
                });
            },
            error(err) {
                res.status(500).send(err);
            }
        });
    });
});

module.exports = router;
