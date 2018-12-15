const chai = require('chai');
const fruitDAO = require('./../model/DAO/fruitDAO');

const { expect } = chai;

describe('FruitUnitTest', () => {
    const fruit1 = {
        name: 'Coconut_test',
        description: 'Brown',
        price: 800
    };
    const fruit2 = {
        name: 'Pear_test',
        description: 'Green',
        price: 200
    };

    before((done) => {
        fruitDAO.createFruit(fruit1, {
            success(f) {
                expect(f.name).to.eql(fruit1.name);
                expect(f.description).to.eql(fruit1.description);
                expect(f.price).to.eql(fruit1.price);

                fruit1._id = f._id;
                done();
            },
            error(err) {
                done(err);
            }
        });
    });

    after((done) => {
        fruitDAO.deleteFruit(fruit1._id, {
            success() {
                done();
            },
            error() {}
        });
    });

    it('#createFruit', (done) => {
        fruitDAO.createFruit(fruit2, {
            success(f) {
                expect(f.name).to.eql(fruit2.name);
                expect(f.description).to.eql(fruit2.description);
                expect(f.price).to.eql(fruit2.price);
                fruit2._id = f._id;
                done();
            },
            error(err) {
                expect(err).to.be.null;
                done(err);
            }
        });
    }).timeout(10000);

    it('#createDuplicatedFruit', (done) => {
        fruitDAO.createFruit(fruit2, {
            success(f) {
                expect(f.name).to.eql(fruit2.name);
                expect(f.description).to.eql(fruit2.description);
                expect(f.price).to.eql(fruit2.price);
                done();
            },
            error(err) {
                expect(err).to.not.be.null;
                done();
            }
        });
    }).timeout(10000);

    it('#readFruitById', (done) => {
        fruitDAO.readFruitById(fruit1._id, {
            success(f) {
                expect(f.name).to.eql(fruit1.name);
                expect(f.description).to.eql(fruit1.description);
                expect(f.price).to.eql(fruit1.price);
                done();
            },
            error(err) {
                expect(err).to.be.null;
                done();
            }
        });
    }).timeout(10000);

    it('#readNonExistingFruit', (done) => {
        fruitDAO.readFruitById('-1', {
            success() {
                expect.fail();
                done();
            },
            error(err) {
                expect(err).to.not.be.null;
                done();
            }
        });
    }).timeout(10000);

    it('#updateFruit', (done) => {
        fruit1.price = 99;
        fruitDAO.updateFruit(fruit1._id, fruit1, {
            success(f) {
                expect(f.price).to.eql(99);
                done();
            },
            error(err) {
                expect(err).to.be.null;
                done();
            }
        });
    }).timeout(10000);

    it('#partialUpdateFruit', (done) => {
        fruitDAO.updateFruit(
            fruit1._id,
            { price: 500 },
            {
                success(f) {
                    expect(f.price).to.eql(500);
                    expect(f.name).to.eql(fruit1.name);
                    expect(f.description).to.eql(fruit1.description);
                    done();
                },
                error(err) {
                    expect(err).to.be.null;
                    done();
                }
            }
        );
    }).timeout(10000);

    it('#updateNonExistingFruit', (done) => {
        fruit1.price = 99;
        fruitDAO.updateFruit('-1', fruit1, {
            success() {
                expect.fail();
                done();
            },
            error(err) {
                expect(err).to.not.be.null;
                done();
            }
        });
    }).timeout(10000);

    it('#deleteFruit', (done) => {
        fruitDAO.deleteFruit(fruit2._id, {
            success() {
                done();
            },
            error(err) {
                expect(err).to.be.null;
                done();
            }
        });
    }).timeout(10000);

    it('#deleteNonExistingFruit', (done) => {
        fruitDAO.deleteFruit('-1', {
            success() {
                expect.fail();
                done();
            },
            error(err) {
                expect(err).to.not.be.null;
                done();
            }
        });
    }).timeout(10000);
});
