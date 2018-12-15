const express = require('express');

const router = express.Router();
const domain = require('domain');
const userDAO = require('./../../../model/DAO/userDAO');

const isInTest = typeof global.it === 'function';

// CREATE a new user
router.post('/', (req, res) => {
    const d = domain.create();

    d.on('error', (error) => {
        if (!isInTest) console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        userDAO.createUser(
            {
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone
            },
            {
                success(user) {
                    res.status(201).send({
                        msg: `User created successfully: ${JSON.stringify(user)}`,
                        data: user
                    });
                },
                error(err) {
                    res.status(500).send(err);
                }
            }
        );
    });
});

// READ all Users
router.get('/', (req, res) => {
    const d = domain.create();
    const { skip, count } = req.query;

    d.on('error', (error) => {
        if (!isInTest) console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        userDAO.readUsers(skip, count, {
            success(Users) {
                res.status(200).send(JSON.stringify(Users));
            },
            error(err) {
                res.status(500).send(err);
            }
        });
    });
});

// READ User by id
router.get('/:id', (req, res) => {
    const d = domain.create();

    d.on('error', (error) => {
        if (!isInTest) console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        userDAO.readUserById(req.params.id, {
            success(User) {
                res.status(200).send(JSON.stringify(User));
            },
            error(err) {
                res.status(404).send(err);
            }
        });
    });
});

// UPDATE User
router.put('/:id', (req, res) => {
    const d = domain.create();

    d.on('error', (error) => {
        if (!isInTest) console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        userDAO.updateUser(
            req.params.id,
            {
                username: req.body.username,
                password: req.body.password
            },
            {
                success(user) {
                    res.status(200).send({
                        msg: `User updated successfully: ${JSON.stringify(user)}`,
                        data: user
                    });
                },
                error(err) {
                    res.status(500).send(err);
                }
            }
        );
    });
});

// DELETE User
router.delete('/:id', (req, res) => {
    const d = domain.create();

    d.on('error', (error) => {
        if (!isInTest) console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        userDAO.deleteUser(req.params.id, {
            success(u) {
                res.status(200).send({
                    msg: `User deleted successfully: ${req.params.id}`,
                    data: u
                });
            },
            error(err) {
                res.status(500).send(err);
            }
        });
    });
});

// USER login
// curl -H "Content-Type: application/json" -X POST -d '{"username":"han_solo","password":"chewbacca"}' http://localhost:8000/api/0.1/user/login
router.post('/login', (req, res) => {
    const d = domain.create();

    d.on('error', (error) => {
        if (!isInTest) console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        userDAO.loginUser(
            {
                username: req.body.username,
                password: req.body.password
            },
            {
                success(user) {
                    res.status(200).send(user);
                },
                error(err) {
                    res.status(403).send(err);
                }
            }
        );
    });
});

module.exports = router;
