const express = require('express');
const router = express.Router();
const domain = require('domain');
const userDAO = require('./../../../model/DAO/userDAO');

const isInTest = typeof global.it === 'function';

//CREATE a new user
router.post('/', function(req, res) {
    const d = domain.create();

    d.on('error', function(error) {
        if (!isInTest) console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        userDAO.createUser(
            {
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone
            },
            {
                success: function(user) {
                    res.status(201).send({
                        msg: 'User created successfully: ' + JSON.stringify(user),
                        data: user
                    });
                },
                error: function(err) {
                    res.status(500).send(err);
                }
            }
        );
    });
});

//READ all Users
router.get('/', function(req, res) {
    const d = domain.create();
    const skip = req.query.skip;
    const count = req.query.count;

    d.on('error', function(error) {
        if (!isInTest) console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        userDAO.readUsers(skip, count, {
            success: function(Users) {
                res.status(200).send(JSON.stringify(Users));
            },
            error: function(err) {
                res.status(500).send(err);
            }
        });
    });
});

//READ User by id
router.get('/:id', function(req, res) {
    const d = domain.create();

    d.on('error', function(error) {
        if (!isInTest) console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        userDAO.readUserById(req.params.id, {
            success: function(User) {
                res.status(200).send(JSON.stringify(User));
            },
            error: function(err) {
                res.status(404).send(err);
            }
        });
    });
});

//UPDATE User
router.put('/:id', function(req, res) {
    const d = domain.create();

    d.on('error', function(error) {
        if (!isInTest) console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        userDAO.updateUser(
            req.params.id,
            {
                username: req.body.username,
                password: req.body.password
            },
            {
                success: function(user) {
                    res.status(200).send({
                        msg: 'User updated successfully: ' + JSON.stringify(user),
                        data: user
                    });
                },
                error: function(err) {
                    res.status(500).send(err);
                }
            }
        );
    });
});

//DELETE User
router.delete('/:id', function(req, res) {
    const d = domain.create();

    d.on('error', function(error) {
        if (!isInTest) console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        userDAO.deleteUser(req.params.id, {
            success: function(u) {
                res.status(200).send({
                    msg: 'User deleted successfully: ' + req.params.id,
                    data: u
                });
            },
            error: function(err) {
                res.status(500).send(err);
            }
        });
    });
});

//USER login
//curl -H "Content-Type: application/json" -X POST -d '{"username":"han_solo","password":"chewbacca"}' http://localhost:8000/api/0.1/user/login
router.post('/login', function(req, res) {
    const d = domain.create();

    d.on('error', function(error) {
        if (!isInTest) console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(function() {
        userDAO.loginUser(
            {
                username: req.body.username,
                password: req.body.password
            },
            {
                success: function(user) {
                    res.status(200).send(user);
                },
                error: function(err) {
                    res.status(403).send(err);
                }
            }
        );
    });
});

module.exports = router;
