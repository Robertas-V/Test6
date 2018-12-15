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
        this.timeout(10000);
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
        this.timeout(10000);
        fruitDAO.deleteFruit(fruit1._id, {
            success() {
                done();
            },
            error() {}
        });
    });

    it('#createFruit', (done) => {
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
                expect(err).to.be.null;
                done(err);
            }
        });
    });

    it('#createDuplicatedFruit', (done) => {
        this.timeout(10000);
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
    });

    it('#readFruitById', (done) => {
        this.timeout(10000);
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
    });

    it('#readNonExistingFruit', (done) => {
        this.timeout(10000);
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
    });

    it('#updateFruit', (done) => {
        this.timeout(10000);
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
    });

    it('#partialUpdateFruit', (done) => {
        this.timeout(10000);
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
    });

    it('#updateNonExistingFruit', (done) => {
        this.timeout(10000);
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
    });

    it('#deleteFruit', (done) => {
        this.timeout(10000);
        fruitDAO.deleteFruit(fruit2._id, {
            success() {
                done();
            },
            error(err) {
                expect(err).to.be.null;
                done();
            }
        });
    });

    it('#deleteNonExistingFruit', (done) => {
        this.timeout(10000);
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
    });
});
