const chai = require('chai');
const supertest = require('supertest');
const app = require('../app.js');
const userDAO = require('./../model/DAO/userDAO');

const { expect } = chai;
const request = supertest(app);

describe('UserService', () => {
    const user1 = {
        username: 'test@test.com',
        password: 'pito'
    };

    const user2 = {
        username: 'test2@mail.com',
        password: 'pass2'
    };

    before((done) => {
        userDAO.createUser(user2, {
            success(u) {
                expect(u.username).to.eql('test2@mail.com');
                expect(u.password).to.eql('pass2');
                user2._id = u._id;
                done();
            },
            error(err) {
                done(err);
            }
        });
    });

    after((done) => {
        userDAO.deleteUser(user1._id, {
            success() {
                done();
            },
            error() {}
        });
    });

    describe('POST /users/', () => {
        it('creates a new user', (done) => {
            request
                .post('/api/0.1/user/')
                .send(user1)
                .expect(201)
                .end((err, res) => {
                    if (err) throw err;
                    user1._id = res.body.data._id;
                    done();
                });
        }).timeout(10000);
    });

    describe('POST /user/', () => {
        it('tries to create a duplicated user', (done) => {
            request
                .post('/api/0.1/user/')
                .send(user1)
                .expect(500)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        }).timeout(10000);
    });
    /*
    describe('POST /users/', function () {
        it('tries to create an invalid user', function (done) {
            this.timeout(10000);
            hippie(server)
            .json()
            .send(invalid_user)
            .post('http://localhost:8000/api/0.1/user/')
            .expectStatus(500)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });
*/
    describe('GET /user/', () => {
        it('returns all users', (done) => {
            request
                .get('/api/0.1/user/')
                .expect(200)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        }).timeout(10000);
    });

    describe('GET /user/:id', () => {
        it('returns a user based on the id', (done) => {
            request
                .get(`/api/0.1/user/${user1._id}`)
                .expect(200)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        }).timeout(10000);
    });

    describe('GET /users/:id', () => {
        it('tries to read user with non-existing id', (done) => {
            request
                .get('/api/0.1/user/nonvalidid')
                .expect(404)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        }).timeout(10000);
    });

    describe('UPDATE /users/:id', () => {
        it('updates user', (done) => {
            user2.username = 'foo';

            request
                .put(`/api/0.1/user/${user2._id}`)
                .send(user2)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.body.data.username).to.eql('foo');
                    done();
                });
        }).timeout(10000);
    });

    describe('UPDATE /users/:id', () => {
        it('updates user with invalid username', (done) => {
            user2.username = undefined;

            request
                .put(`/api/0.1/user/${user2._id}`)
                .send(user2)
                .expect(500)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        }).timeout(10000);
    });

    describe('UPDATE /users/:id', () => {
        it('updates non-existing user', (done) => {
            user2.username = 'foo';

            request
                .put('/api/0.1/user/nonvalidid')
                .send(user2)
                .expect(500)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        }).timeout(10000);
    });

    describe('POST /users/login', () => {
        it('tries to login a user', (done) => {
            request
                .post('/api/0.1/user/login')
                .send(user1)
                .expect(200)
                .end((err, res) => {
                    console.log(res.body.data);
                    if (err) throw err;
                    done();
                });
        }).timeout(10000);
    });

    describe('DELETE /users/:id', () => {
        it('deletes user', (done) => {
            request
                .del(`/api/0.1/user/${user2._id}`)
                .expect(200)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        }).timeout(10000);
    });

    describe('DELETE /users/:id', () => {
        it('deletes non-existing user', (done) => {
            request
                .del('/api/0.1/user/nonvalidid')
                .expect(500)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        }).timeout(10000);
    });
});
