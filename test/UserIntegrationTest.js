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
        this.timeout(10000);
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
        this.timeout(10000);
        userDAO.deleteUser(user1._id, {
            success() {
                done();
            },
            error() {}
        });
    });

    describe('POST /users/', () => {
        it('creates a new user', (done) => {
            this.timeout(10000);

            request
                .post('/api/0.1/user/')
                .send(user1)
                .expect(201)
                .end((err, res) => {
                    if (err) throw err;
                    user1._id = res.body.data._id;
                    done();
                });
        });
    });

    describe('POST /user/', () => {
        it('tries to create a duplicated user', (done) => {
            this.timeout(10000);

            request
                .post('/api/0.1/user/')
                .send(user1)
                .expect(500)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
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
            this.timeout(10000);

            request
                .get('/api/0.1/user/')
                .expect(200)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('GET /user/:id', () => {
        it('returns a user based on the id', (done) => {
            this.timeout(10000);

            request
                .get(`/api/0.1/user/${user1._id}`)
                .expect(200)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('GET /users/:id', () => {
        it('tries to read user with non-existing id', (done) => {
            this.timeout(10000);

            request
                .get('/api/0.1/user/nonvalidid')
                .expect(404)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('UPDATE /users/:id', () => {
        it('updates user', (done) => {
            this.timeout(10000);
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
        });
    });

    describe('UPDATE /users/:id', () => {
        it('updates user with invalid username', (done) => {
            this.timeout(10000);
            user2.username = undefined;

            request
                .put(`/api/0.1/user/${user2._id}`)
                .send(user2)
                .expect(500)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('UPDATE /users/:id', () => {
        it('updates non-existing user', (done) => {
            this.timeout(10000);
            user2.username = 'foo';

            request
                .put('/api/0.1/user/nonvalidid')
                .send(user2)
                .expect(500)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('POST /users/login', () => {
        it('tries to login a user', (done) => {
            this.timeout(10000);

            request
                .post('/api/0.1/user/login')
                .send(user1)
                .expect(200)
                .end((err, res) => {
                    console.log(res.body.data);
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('DELETE /users/:id', () => {
        it('deletes user', (done) => {
            this.timeout(10000);

            request
                .del(`/api/0.1/user/${user2._id}`)
                .expect(200)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('DELETE /users/:id', () => {
        it('deletes non-existing user', (done) => {
            this.timeout(10000);

            request
                .del('/api/0.1/user/nonvalidid')
                .expect(500)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });
});
