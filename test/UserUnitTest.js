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
        this.timeout(10000);
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
        this.timeout(10000);
        userDAO.deleteUser(user1._id, {
            success() {
                done1 = true;
                finish();
            },
            error() {}
        });
    });

    it('#createUser', (done) => {
        this.timeout(10000);
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
    });

    it('#createDuplicatedUser', (done) => {
        this.timeout(10000);
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
    });

    it('#readUserById', (done) => {
        this.timeout(10000);
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
    });

    it('#readNonExistingUser', (done) => {
        this.timeout(10000);
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
    });

    it('#updateUser', (done) => {
        this.timeout(10000);
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
    });

    it('#updateNonExistingUser', (done) => {
        this.timeout(10000);
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
    });

    it('#loginUser', (done) => {
        this.timeout(10000);
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
    });

    it('#deleteUser', (done) => {
        this.timeout(10000);
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
    });
});
