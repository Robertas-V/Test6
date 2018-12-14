var db = require('../../config/mongodb').init(),
    mongoose = require('mongoose');

var isInTest = typeof global.it === 'function';

var Schema = mongoose.Schema;

var dronePartSpecSchema = new Schema({
  weight:         { type: Number },
  height:         { type: Number },
  width:          { type: Number },
  length:         { type: Number },
  mountWidth:     { type: Number },
  mountLength:    { type: Number },
  voltsMin:       { type: Number },
  voltsMax:       { type: Number },
  voltMetric:     { type: String },
  part4in1ESC:    { type: Boolean },
  ampsConstant:   { type: Number },
  ampsPeak:       { type: Number },
  firmware:       { type: String }
});

var dronePartSupportedESCFirmwareSchema = new Schema({
    BLHeli:       { type: Boolean },
    BLHeli_S:     { type: Boolean },
    BLHeli_32:    { type: Boolean },
    SimonK:       { type: Boolean },
    KISS:         { type: Boolean },
    Other:        { type: String }
});

var dronePartSupportedESCProtocolSchema = new Schema({
    PWM:          { type: Boolean },
    Oneshot125:   { type: Boolean },
    Oneshot42:    { type: Boolean },
    Multishot:    { type: Boolean },
    Dshot150:     { type: Boolean },
    Dshot300:     { type: Boolean },
    Dshot600:     { type: Boolean },
    Dshot1200:    { type: Boolean },
    ProShot:      { type: Boolean }
});

var dronePartSupportedFCPinSchema = new Schema({
    pinBEC33v:    { type: Number },
    pinBEC5v:     { type: Number },
    pinBEC9v:     { type: Number },
    pinVBat:      { type: Number },
    pinUARTS:     { type: Number },
    pinCAM:       { type: Boolean },
    pinVTX:       { type: Boolean },
    pinBuzzer:    { type: Boolean },
    pinLED:       { type: Boolean }
});

var dronePartFeatureSchema = new Schema({
  supportedESCFirmware:   dronePartSupportedESCFirmwareSchema,
  supportedESCProtocol:   dronePartSupportedESCProtocolSchema,
  supportedFCPinSchema:   dronePartSupportedFCPinSchema,
  voltageMonitor:         { type: Boolean },
  currentMonitor:         { type: Boolean },
  OSD:                    { type: Boolean },
  blackbox:               { type: Boolean }
});

// var dronePartImageSchema = new Schema({
//   name:           { type: String },
//   type:           { type: String },
//   image:          { type: Buffer },
//   dateCreated:    { type: Date, default: Date.now }
// });


var dronePartImageSchema = new Schema({
  image:          { type: Buffer },
  dateCreated:    { type: Date, default: Date.now }
});

var dronePartRatingSchema = new Schema({
  category:       { type: String },
  rating:         { type: Number },
  dateCreated:    { type: Date, default: Date.now }
});

// Question and answers section (user posts)

var dronePartPriceSchema = new Schema({
  price:          { type: Number },
  currency:       { type: String },
  isDiscount:     { type: Boolean, default: false },
  dateCreated:    { type: Date, default: Date.now }
});

var dronePartSellerSchema = new Schema({
  title:          { type: String },
  path:           { type: String },
  prices:         { dronePartPriceSchema },
  dateCreated:    { type: Date, default: Date.now }
});


var dronePartSchema = new Schema({
    name:           { type: String},//, required: true, unique: true },
    description:    { type: String},//, required: true },
    category:       { type: String},//, required: true },
    brand:          { type: String},//, required: true },
    company:        { type: String },
    datePublished:  { type: String },

    sellers:        dronePartSellerSchema,
    specs:          dronePartSpecSchema,
    features:       dronePartFeatureSchema,
    images:         [ dronePartImageSchema ],
    ratings:        [ dronePartRatingSchema ],

    dateCreated:    { type: Date, default: Date.now },
    dateModified:   { type: Date }
});

dronePartSchema.pre('save', function(next){
    now = new Date();
    this.dateModified = now;
    // if ( !this.dateCreated ) {
    //     this.dateCreated = now;
    // }
    next();
});
var dronePartModel = db.model('droneparts', dronePartSchema);

//CREATE new dronePart
function createdronePart(dronePart, callbacks){
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


    var part = new dronePartModel(dronePart);

    part.save(function (err) {
        if (!err) {
            if(!isInTest) console.log("[ADD]   dronePart created with id: " + dronePart._id);
            callbacks.success(part);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

//READ all droneParts
function readdroneParts(category, skip, count, callbacks){
    filter = (category !== undefined) ? {"category": category} : {};

    return dronePartModel.find(filter).sort('-dateCreated').skip(skip).limit(count)
    .exec('find', function (err, droneParts) {
        if (!err) {
            if(!isInTest) console.log('[GET]   Get droneParts: ' + droneParts.length);
            callbacks.success(droneParts);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

//READ dronePart by id
function readdronePartById(id, callbacks){
    return dronePartModel.findById(id, function (err, dronePart) {
        if (!err) {
            if(!isInTest) console.log('[GET]   Get dronePart: ' + dronePart._id);
            callbacks.success(dronePart);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

//UPDATE dronePart
function updatedronePart(id, dronePart, callbacks){
    return dronePartModel.findById(id, function (err, part) {
        if (!err) {
            // TODO: Update part is missing a lot of objects
            part.name               = dronePart.name;
            part.description        = dronePart.description;
            part.category           = dronePart.category;
            part.brand              = dronePart.brand;
            part.company            = dronePart.company;
            part.datePublished      = dronePart.datePublished;

            part.specs.height       = dronePart.specs.height;
            part.specs.width        = dronePart.specs.width;
            part.specs.lenght       = dronePart.specs.lenght;
            part.specs.weight       = dronePart.specs.weight;
            part.specs.voltsMin     = dronePart.specs.voltsMin;
            part.specs.voltsMax     = dronePart.specs.voltsMax;
            part.specs.part4in1ESC  = dronePart.specs.part4in1ESC;
            part.specs.ampsConstant = dronePart.specs.ampsConstant;
            part.specs.ampsMax      = dronePart.specs.ampsMax;
            part.specs.firmware     = dronePart.specs.firmware;

            if (dronePart.images.imageTitle) part.images.imageTitle = dronePart.images.imageTitle;
            if (dronePart.images.type) part.images.type = dronePart.images.type;
            if (dronePart.images.path) part.images.path = dronePart.images.path;

            return part.save(function (err) {
                if (!err) {
                    if(!isInTest) console.log("[UDP]   Updated dronePart: " + part._id);
                    callbacks.success(part);
                } else {
                    if(!isInTest) console.log(err);
                    callbacks.error(err);
                }
            });
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

//DELETE dronePart
function deletedronePart(id, callbacks){
    return dronePartModel.findById(id, function (err, part) {
        if (!err) {
            return part.remove(function (err) {
                if (!err) {
                    if(!isInTest) console.log("[DEL]    Deleted dronePart: " + part._id);
                    callbacks.success(part);
                } else {
                    if(!isInTest) console.log(err);
                    callbacks.error(err);
                }
            });
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

module.exports.createdronePart    = createdronePart;
module.exports.readdroneParts     = readdroneParts;
module.exports.readdronePartById  = readdronePartById;
module.exports.updatedronePart    = updatedronePart;
module.exports.deletedronePart    = deletedronePart;
