var db = require('../../config/mongodb').init(),
    mongoose = require('mongoose');

var isInTest = typeof global.it === 'function';

var Schema = mongoose.Schema;

var dronePartSpecSchema = new Schema({
  height:         { type: Number },
  width:          { type: Number },
  lenght:         { type: Number },
  weight:         { type: Number },
  voltsMin:       { type: Number },
  voltsMax:       { type: Number },
  amps:           { type: Number },
  ampsMax:        { type: Number },
  firware:        { type: String }
});

var dronePartImageSchema = new Schema({
  title:          { type: String },
  type:           { type: String },
  path:           { type: String },
  dateCreated:    { type: Date, default: Date.now }
});

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
    name:           { type: String, required: true, unique: true },
    description:    { type: String, required: true },
    category:       { type: String, required: true },
    brand:          { type: String, required: true },
    company:        { type: String },
    datePublished:  { type: String },

    sellers:        { dronePartSellerSchema },
    specs:          { dronePartSpecSchema },
    images:         { dronePartImageSchema },

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
var dronePartModel = db.model('dronePart', dronePartSchema);

//CREATE new dronePart
function createdronePart(dronePart, callbacks){
    var specs = new dronePartSpecSchema ({
        height:         dronePart.height,
        width:          dronePart.width,
        lenght:         dronePart.lenght,
        weight:         dronePart.weight,
        voltsMin:       dronePart.voltsMin,
        voltsMax:       dronePart.voltsMax,
        amps:           dronePart.amps,
        ampsMax:        dronePart.ampsMax,
        firware:        dronePart.firware
    });

    var images = new dronePartImageSchema ({
        title:          dronePart.imageTitle,
        type:           dronePart.imageType,
        path:           dronePart.imagePath
    });

    var part = new dronePartModel({
        name:           dronePart.name,
        description:    dronePart.description,
        category:       dronePart.category,
        brand:           dronePart.brand,
        company:         dronePart.company,
        datePublished:   dronePart.datePublished,
        specs:           { specs },
        images:          { images }
    });

    part.save(function (err) {
        if (!err) {
            if(!isInTest) console.log("[ADD]   dronePart created with id: " + f._id);
            callbacks.success(part);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

//READ all droneParts
function readdroneParts(skip, count, callbacks){
    return dronePartModel.find()
    .sort('-dateCreated').skip(skip).limit(count).exec('find', function (err, droneParts) {
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
            part.name           = dronePart.name;
            part.description    = dronePart.description;
            part.category       = dronePart.category;
            part.brand          = dronePart.brand;
            part.company        = dronePart.company;
            part.datePublished  = dronePart.datePublished;

            part.specs.height   = dronePart.specs.height;
            part.specs.width    = dronePart.specs.width;
            part.specs.lenght   = dronePart.specs.lenght;
            part.specs.weight   = dronePart.specs.weight;
            part.specs.voltsMin = dronePart.specs.voltsMin;
            part.specs.voltsMax = dronePart.specs.voltsMax;
            part.specs.amps     = dronePart.specs.amps;
            part.specs.ampsMax  = dronePart.specs.ampsMax;
            part.specs.firware  = dronePart.specs.firware;

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
