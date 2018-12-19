/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const db = require('../../config/mongodb').init();

const isInTest = typeof global.it === 'function';

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateCreated: { type: Date },
    dateModified: { type: Date }
});
UserSchema.pre('save', (next) => {
    const now = new Date();
    this.dateModified = now;
    if (!this.dateCreated) {
        this.dateCreated = now;
    }
    next();
});

// Set up schema
const UserModel = db.model('User', UserSchema);

// READ all users
function readUsers(skip, count, callbacks) {
    return UserModel.find()
        .sort('-dateCreated')
        .skip(skip)
        .limit(count)
        .exec('find', (err, users) => {
            if (!err) {
                if (!isInTest) console.log(`[GET]   Get all users: ${JSON.stringify(users)}`);
                callbacks.success(users);
            } else {
                if (!isInTest) console.log(err);
                callbacks.error(err);
            }
        });
}

// READ user by id
function readUserById(id, callbacks) {
    return UserModel.findById(id, (err, user) => {
        if (!err) {
            if (!isInTest) console.log(`[GET]   Get user: ${JSON.stringify(user)}`);
            callbacks.success(user);
        } else {
            if (!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

// CREATE user function
function createUser(user, callbacks) {
    const u = new UserModel({
        username: user.username,
        password: user.password
    });

    u.save((err) => {
        if (!err) {
            if (!isInTest) console.log(`[ADD]   User created with username: ${user.username}`);
            callbacks.success(u);
        } else {
            if (!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

// createUser( {username: "Robertas", password: "pass"} );

// UPDATE user
function updateUser(id, user, callbacks) {
    return UserModel.findById(id, (err, u) => {
        if (!err) {
            u.username = user.username;
            u.password = user.password;
            return u.save((innerErr) => {
                if (!innerErr) {
                    if (!isInTest) console.log(`[UDP]   Updated user: ${JSON.stringify(u)}`);
                    callbacks.success(u);
                } else {
                    if (!isInTest) console.log(innerErr);
                    callbacks.error(innerErr);
                }
            });
        }
        if (!isInTest) console.log(err);
        callbacks.error(err);
    });
}

// DELETE user
function deleteUser(id, callbacks) {
    return UserModel.findById(id, (_, user) =>
        user.remove((err) => {
            if (!err) {
                if (!isInTest) console.log(`[DEL]    Deleted user: ${id}`);
                callbacks.success(user);
            } else {
                if (!isInTest) console.log(err);
                callbacks.error(err);
            }
        })
    );
}

// Login user
function loginUser(user, callbacks) {
    return UserModel.find({ username: user.username }, (err, u) => {
        if (!err) {
            if (u[0]) {
                if (u[0].password === user.password) {
                    // Login ok
                    callbacks.success(u[0]);
                } else {
                    // Password mismatch
                    callbacks.error({ msg: 'Invalid login parameters', data: user });
                }
            } else {
                // User does not exist
                callbacks.error({ msg: 'Invalid login parameters', data: user });
            }
        } else {
            callbacks.error(err);
        }
    });
}
module.exports.createUser = createUser;
module.exports.readUsers = readUsers;
module.exports.readUserById = readUserById;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.loginUser = loginUser;
