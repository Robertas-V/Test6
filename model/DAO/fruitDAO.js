/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const db = require('../../config/mongodb').init();

const isInTest = typeof global.it === 'function';

const { Schema } = mongoose;
const FruitSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number },
    dateCreated: { type: Date },
    dateModified: { type: Date }
});
FruitSchema.pre('save', (next) => {
    const now = new Date();
    this.dateModified = now;
    if (!this.dateCreated) {
        this.dateCreated = now;
    }
    next();
});
const FruitModel = db.model('Fruit', FruitSchema);

// CREATE new fruit
function createFruit(fruit, callbacks) {
    const f = new FruitModel({
        name: fruit.name,
        description: fruit.description,
        price: fruit.price
    });

    f.save((err) => {
        if (!err) {
            if (!isInTest) console.log(`[ADD]   Fruit created with id: ${f._id}`);
            callbacks.success(f);
        } else {
            if (!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

// READ all fruits
function readFruits(skip, count, callbacks) {
    return FruitModel.find()
        .sort('-dateCreated')
        .skip(skip)
        .limit(count)
        .exec('find', (err, fruits) => {
            if (!err) {
                if (!isInTest) console.log(`[GET]   Get fruits: ${fruits.length}`);
                callbacks.success(fruits);
            } else {
                if (!isInTest) console.log(err);
                callbacks.error(err);
            }
        });
}

// READ fruit by id
function readFruitById(id, callbacks) {
    return FruitModel.findById(id, (err, fruit) => {
        if (!err) {
            if (!isInTest) console.log(`[GET]   Get fruit: ${fruit._id}`);
            callbacks.success(fruit);
        } else {
            if (!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

// UPDATE fruit
function updateFruit(id, fruit, callbacks) {
    return FruitModel.findById(id, (err, f) => {
        if (!err) {
            if (fruit.name) f.name = fruit.name;
            if (fruit.description) f.description = fruit.description;
            if (fruit.price) f.price = fruit.price;

            return f.save((innerError) => {
                if (!innerError) {
                    if (!isInTest) console.log(`[UDP]   Updated fruit: ${f._id}`);
                    callbacks.success(f);
                } else {
                    if (!isInTest) console.log(innerError);
                    callbacks.error(innerError);
                }
            });
        }
        if (!isInTest) console.log(err);
        callbacks.error(err);
    });
}

// DELETE fruit
function deleteFruit(id, callbacks) {
    return FruitModel.findById(id, (err, f) => {
        if (!err) {
            return f.remove((innerErr) => {
                if (!innerErr) {
                    if (!isInTest) console.log(`[DEL]    Deleted fruit: ${f._id}`);
                    callbacks.success(f);
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

module.exports.createFruit = createFruit;
module.exports.readFruits = readFruits;
module.exports.readFruitById = readFruitById;
module.exports.updateFruit = updateFruit;
module.exports.deleteFruit = deleteFruit;
