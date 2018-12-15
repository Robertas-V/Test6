const chai = require('chai');
const userDAO = require('./../model/DAO/userDAO');

const { expect } = chai;

describe('UserUnitTest', () => {
    const user1 = {
        username: 'user1@mail.com',
        password: 'pass1'
    };
    const user2 = {
        username: 'user2@mail.com',
        password: 'pass2'
    };

    before((done) => {
        userDAO.createUser(user1, {
            success(u) {
                expect(u.username).to.eql('user1@mail.com');
                expect(u.password).to.eql('pass1');
                user1._id = u._id;
                done();
            },
            error(err) {
                done(err);
            }
        });
    });

    after((done) => {
        let done1 = false;
        const done2 = true;
        function finish() {
            if (done1 && done2) {
                done();
            }
        }

        userDAO.deleteUser(user1._id, {
            success() {
                done1 = true;
                finish();
            },
            error() {}
        });
    });

    it('#createUser', (done) => {
        userDAO.createUser(user2, {
            success(u) {
                expect(u.username).to.eql(user2.username);
                expect(u.password).to.eql(user2.password);
                user2._id = u._id;
                done();
            },
            error(err) {
                // console.error(err);
                // expect().fail;
                expect(err).to.be.null;
                done(err);
            }
        });
    }).timeout(10000);

    it('#createDuplicatedUser', (done) => {
        userDAO.createUser(user2, {
            success(u) {
                expect(u.username).to.eql(user2.username);
                expect(u.password).to.eql(user2.password);
                done();
            },
            error(err) {
                expect(err).to.not.be.null;
                done();
            }
        });
    }).timeout(10000);

    it('#readUserById', (done) => {
        userDAO.readUserById(user1._id, {
            success(u) {
                expect(u.username).to.eql(user1.username);
                expect(u.password).to.eql(user1.password);
                done();
            },
            error(err) {
                expect(err).to.be.null;
                done();
            }
        });
    }).timeout(10000);

    it('#readNonExistingUser', (done) => {
        userDAO.readUserById('-1', {
            success(u) {
                expect(u.username).to.eql(user1.username);
                expect(u.password).to.eql(user1.password);
                done();
            },
            error(err) {
                expect(err).to.not.be.null;
                done();
            }
        });
    }).timeout(10000);

    it('#updateUser', (done) => {
        user1.username = 'foo';
        userDAO.updateUser(user1._id, user1, {
            success(user) {
                expect(user.username).to.eql('foo');
                done();
            },
            error(err) {
                expect(err).to.be.null;
                done();
            }
        });
    }).timeout(10000);

    it('#updateNonExistingUser', (done) => {
        user1.username = 'foo';
        userDAO.updateUser('-1', user1, {
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

    it('#loginUser', (done) => {
        userDAO.loginUser(user2, {
            success(u) {
                expect(u.username).to.eql(user2.username);
                done();
            },
            error(err) {
                expect(err).to.be.null;
                done();
            }
        });
    }).timeout(10000);

    it('#deleteUser', (done) => {
        userDAO.deleteUser(user2._id, {
            success(u) {
                expect(u).to.not.be.null;
                done();
            },
            error(err) {
                expect(err).to.be.null;
                done();
            }
        });
    }).timeout(10000);
});
