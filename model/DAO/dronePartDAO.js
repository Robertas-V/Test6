/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
// TODO: You should remove these rules and fix them
const mongoose = require('mongoose');
const db = require('../../config/mongodb').init();

const isInTest = typeof global.it === 'function';

const { Schema } = mongoose;

const dronePartSpecSchema = new Schema({
    weight: { type: Number },
    height: { type: Number },
    width: { type: Number },
    length: { type: Number },
    mountWidth: { type: Number },
    mountLength: { type: Number },
    voltsMin: { type: Number },
    voltsMax: { type: Number },
    voltMetric: { type: String },
    part4in1ESC: { type: Boolean },
    ampsConstant: { type: Number },
    ampsPeak: { type: Number },
    firmware: { type: String }
});

const dronePartSupportedESCFirmwareSchema = new Schema({
    BLHeli: { type: Boolean },
    BLHeli_S: { type: Boolean },
    BLHeli_32: { type: Boolean },
    SimonK: { type: Boolean },
    KISS: { type: Boolean },
    Other: { type: String }
});

const dronePartSupportedESCProtocolSchema = new Schema({
    PWM: { type: Boolean },
    Oneshot125: { type: Boolean },
    Oneshot42: { type: Boolean },
    Multishot: { type: Boolean },
    Dshot150: { type: Boolean },
    Dshot300: { type: Boolean },
    Dshot600: { type: Boolean },
    Dshot1200: { type: Boolean },
    ProShot: { type: Boolean }
});

const dronePartSupportedFCPinSchema = new Schema({
    pinBEC33v: { type: Number },
    pinBEC5v: { type: Number },
    pinBEC9v: { type: Number },
    pinVBat: { type: Number },
    pinUARTS: { type: Number },
    pinCAM: { type: Boolean },
    pinVTX: { type: Boolean },
    pinBuzzer: { type: Boolean },
    pinLED: { type: Boolean }
});

const dronePartFeatureSchema = new Schema({
    supportedESCFirmware: dronePartSupportedESCFirmwareSchema,
    supportedESCProtocol: dronePartSupportedESCProtocolSchema,
    supportedFCPinSchema: dronePartSupportedFCPinSchema,
    voltageMonitor: { type: Boolean },
    currentMonitor: { type: Boolean },
    OSD: { type: Boolean },
    blackbox: { type: Boolean }
});

// var dronePartImageSchema = new Schema({
//   name:           { type: String },
//   type:           { type: String },
//   image:          { type: Buffer },
//   dateCreated:    { type: Date, default: Date.now }
// });

const dronePartImageSchema = new Schema({
    image: { type: Buffer },
    dateCreated: { type: Date, default: Date.now }
});

const dronePartRatingSchema = new Schema({
    category: { type: String },
    rating: { type: Number },
    dateCreated: { type: Date, default: Date.now }
});

// Question and answers section (user posts)

const dronePartPriceSchema = new Schema({
    price: { type: Number },
    currency: { type: String },
    isDiscount: { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now }
});

const dronePartSellerSchema = new Schema({
    title: { type: String },
    path: { type: String },
    prices: { dronePartPriceSchema },
    dateCreated: { type: Date, default: Date.now }
});

const dronePartSchema = new Schema({
    name: { type: String }, // , required: true, unique: true },
    description: { type: String }, // , required: true },
    category: { type: String }, // , required: true },
    brand: { type: String }, // , required: true },
    company: { type: String },
    datePublished: { type: String },

    sellers: dronePartSellerSchema,
    specs: dronePartSpecSchema,
    features: dronePartFeatureSchema,
    images: [dronePartImageSchema],
    ratings: [dronePartRatingSchema],

    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date }
});

dronePartSchema.pre('save', (next) => {
    const now = new Date();
    this.dateModified = now;
    // if ( !this.dateCreated ) {
    //     this.dateCreated = now;
    // }
    next();
});
const DronePartModel = db.model('droneParts', dronePartSchema);

// CREATE new dronePart
function createdronePart(dronePart, callbacks) {
    // var specs = new dronePartSpecSchema ({
    //     height:         dronePart.height,
    //     width:          dronePart.width,
    //     length:         dronePart.length,
    //     weight:         dronePart.weight,
    //     voltsMin:       dronePart.voltsMin,
    //     voltsMax:       dronePart.voltsMax,
    //     amps:           dronePart.amps,
    //     ampsMax:        dronePart.ampsMax,
    //     firmware:        dronePart.firmware
    // });
    //
    // var images = new dronePartImageSchema ({
    //     title:          dronePart.imageTitle,
    //     type:           dronePart.imageType,
    //     path:           dronePart.imagePath
    // });

    console.info(dronePart);
    //
    // var part = new dronePartModel({
    //     name:           dronePart.name,
    //     description:    dronePart.description,
    //     category:       dronePart.category,
    //     brand:          dronePart.brand,
    //     company:        dronePart.company,
    //     datePublished:  dronePart.datePublished,
    //     // specs:          { specs },
    //     // images:         { images }
    //     specs:          dronePart.specs,
    //     images:         dronePart.images
    // });

    const part = new DronePartModel(dronePart);

    part.save((err) => {
        if (!err) {
            if (!isInTest) console.log(`[ADD]   dronePart created with id: ${dronePart._id}`);
            callbacks.success(part);
        } else {
            if (!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

// READ all droneParts
function readdroneParts(category, skip, count, callbacks) {
    const filter = category !== undefined ? { category } : {};

    return DronePartModel.find(filter)
        .sort('-dateCreated')
        .skip(skip)
        .limit(count)
        .exec('find', (err, droneParts) => {
            if (!err) {
                if (!isInTest) console.log(`[GET]   Get droneParts: ${droneParts.length}`);
                callbacks.success(droneParts);
            } else {
                if (!isInTest) console.log(err);
                callbacks.error(err);
            }
        });
}

// READ dronePart by id
function readdronePartById(id, callbacks) {
    return DronePartModel.findById(id, (err, dronePart) => {
        if (!err) {
            if (!isInTest) console.log(`[GET]   Get dronePart: ${dronePart._id}`);
            callbacks.success(dronePart);
        } else {
            if (!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

// UPDATE dronePart
function updatedronePart(id, dronePart, callbacks) {
    return DronePartModel.findById(id, (err, part) => {
        if (!err) {
            // TODO: Update part is missing a lot of objects
            part.name = dronePart.name;
            part.description = dronePart.description;
            part.category = dronePart.category;
            part.brand = dronePart.brand;
            part.company = dronePart.company;
            part.datePublished = dronePart.datePublished;

            part.specs.height = dronePart.specs.height;
            part.specs.width = dronePart.specs.width;
            part.specs.lenght = dronePart.specs.lenght;
            part.specs.weight = dronePart.specs.weight;
            part.specs.voltsMin = dronePart.specs.voltsMin;
            part.specs.voltsMax = dronePart.specs.voltsMax;
            part.specs.part4in1ESC = dronePart.specs.part4in1ESC;
            part.specs.ampsConstant = dronePart.specs.ampsConstant;
            part.specs.ampsMax = dronePart.specs.ampsMax;
            part.specs.firmware = dronePart.specs.firmware;

            if (dronePart.images.imageTitle) part.images.imageTitle = dronePart.images.imageTitle;
            if (dronePart.images.type) part.images.type = dronePart.images.type;
            if (dronePart.images.path) part.images.path = dronePart.images.path;

            return part.save((innerError) => {
                if (!innerError) {
                    if (!isInTest) console.log(`[UPD]   Updated dronePart: ${part._id}`);
                    callbacks.success(part);
                } else {
                    if (!isInTest) console.log(innerError);
                    callbacks.error(innerError);
                }
            });
        }
    });
}

// DELETE dronePart
function deletedronePart(id, callbacks) {
    return DronePartModel.findById(id, (err, part) => {
        if (!err) {
            return part.remove((innerErr) => {
                if (!innerErr) {
                    if (!isInTest) console.log(`[DEL]    Deleted dronePart: ${part._id}`);
                    callbacks.success(part);
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

module.exports.createdronePart = createdronePart;
module.exports.readdroneParts = readdroneParts;
module.exports.readdronePartById = readdronePartById;
module.exports.updatedronePart = updatedronePart;
module.exports.deletedronePart = deletedronePart;
