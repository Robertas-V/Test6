const chai = require('chai');
const supertest = require('supertest');
const app = require('../app.js');
const fruitDAO = require('./../model/DAO/fruitDAO');

const { expect } = chai;
const request = supertest(app);

describe('FruitService', () => {
    const fruit1 = {
        name: 'Coconut_test',
        description: 'Brown',
        price: 800
    };
    const fruit2 = {
        name: 'Watermelon_test',
        description: 'Green',
        price: 200
    };

    before((done) => {
        this.timeout(10000);
        fruitDAO.createFruit(fruit2, {
            success(f) {
                expect(f.name).to.eql(fruit2.name);
                expect(f.description).to.eql(fruit2.description);
                expect(f.price).to.eql(fruit2.price);

                fruit2._id = f._id;
                done();
            },
            error(err) {
                done(err);
            }
        });
    });

    after((done) => {
        this.timeout(10000);
        fruitDAO.deleteFruit(fruit1._id, {
            success() {
                done();
            },
            error() {}
        });
    });

    describe('POST /fruit/', () => {
        it('creates a new fruit', (done) => {
            this.timeout(10000);

            request
                .post('/api/0.1/fruit/')
                .send(fruit1)
                .expect(201)
                .end((err, res) => {
                    if (err) throw err;
                    fruit1._id = res.body.data._id;
                    done();
                });
        });
    });

    describe('POST /fruit/', () => {
        it('tries to create a duplicated fruit', (done) => {
            this.timeout(10000);

            request
                .post('/api/0.1/fruit/')
                .send(fruit1)
                .expect(500)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('GET /fruit/', () => {
        it('returns all fruits', (done) => {
            this.timeout(10000);

            request
                .get('/api/0.1/fruit')
                .expect(200)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('GET /fruit/:id', () => {
        it('returns a fruit based on the id', (done) => {
            this.timeout(10000);
            request
                .get(`/api/0.1/fruit/${fruit1._id}`)
                .expect(200)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('GET /fruit/:id', () => {
        it('tries to read a fruit with non-existing id', (done) => {
            this.timeout(10000);

            request
                .get('/api/0.1/fruit/non-valid-id')
                .expect(404)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('UPDATE /fruit/:id', () => {
        it('updates fruit', (done) => {
            this.timeout(10000);

            fruit2.price = 300;

            request
                .put(`/api/0.1/fruit/${fruit2._id}`)
                .send(fruit2)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.body.data.price).to.eql(300);
                    done();
                });
        });
    });

    describe('UPDATE /fruit/:id', () => {
        it('updates fruit with duplicated name', (done) => {
            this.timeout(10000);
            fruit2.name = fruit1.name;

            request
                .put(`/api/0.1/fruit/${fruit2._id}`)
                .send(fruit2)
                .expect(500)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('UPDATE /fruit/:id', () => {
        it('updates non-existing fruit', (done) => {
            this.timeout(10000);
            fruit2.price = 400;

            request
                .put('/api/0.1/fruit/non-valid-id')
                .send(fruit2)
                .expect(500)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('DELETE /fruit/:id', () => {
        it('deletes fruit', (done) => {
            this.timeout(10000);

            request
                .del(`/api/0.1/fruit/${fruit2._id}`)
                .expect(200)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('DELETE /fruit/:id', () => {
        it('deletes non-existing fruit', (done) => {
            this.timeout(10000);

            request
                .del('/api/0.1/fruit/non-valid-id')
                .expect(500)
                .end((err) => {
                    if (err) throw err;
                    done();
                });
        });
    });
});
