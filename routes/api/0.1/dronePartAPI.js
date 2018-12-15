const uuid = require('uuid/v4');
const express = require('express');
const domain = require('domain');
const multer = require('multer');
const fs = require('fs');
const dronePartDAO = require('./../../../model/DAO/dronePartDAO');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/newPart', upload.array(), (req, res) => {
    const base64Data = req.body.images[0];
    console.log('writing file...', base64Data);

    const imagePath = `/Temp/Upload/${uuid()}.png`;

    fs.writeFile(imagePath, base64Data, 'base64', (err) => {
        if (err) console.log(err);

        fs.readFile(imagePath, (innerErr, data) => {
            if (innerErr) throw innerErr;
            console.log('reading file...', data.toString('base64'));
            res.send(data);
        });
    });
});
// var upload = multer({dest: 'uploads/',
//     onFileUploadStart: function (file) {
//       console.log(file.originalname + ' is starting ...')
//     }
// });
// CREATE a new dronePart
// router.post('/newPart', upload.any(), function (req, res){
// router.post('/newPart', function(req, res) {
//     console.log('We are here');
//     // console.log(req);
//     // console.log(Object.keys(req.body.images));

//     // cia failo info uzkoduota stringify reikia atkoduoti
//     // let imagee = req.body.images;//[0];
//     // console.info(req);
//     // console.info(JSON.parse(req.body.images));
//     // let imagee = JSON.parse(req.body.images);
//     // console.info(req.body.images[0]);
//     // let imagee = req.body.images[0];
//     console.info(req.body.images[0]);
//     const imagee = req.body.images[0];
//     // console.info(JSON.parse(req.body.images[0]));
//     // let imagee = JSON.parse(req.body.images[0]);
//     // console.info(JSON.parse(imagee));
//     // yra so failo duomenis i testas.png
//     // var buf = new Buffer(imagee);
//     // fs.writeFile('./testas/image.png', buf);
//     // fs.writeFile("./testas/testas.png", imagee, 'utf8', function(err) {
//     // const base64Data = imagee.replace(/^data:([A-Za-z-+/]+);base64,/, '');
//     // console.info(base64Data);
//     fs.writeFile('./testas/testas.png', imagee, 'base64', err => {
//         // fs.writeFile("./testas/testas.png", imagee.toString('utf8'), 'base64', (err) => {
//         // fs.writeFile("./testas/testas.png", imagee, 'utf8', (err) => {

//         // fs.writeFile("./testas/testas.png", imagee, function(err) {
//         if (err) {
//             console.info(err);
//             return;
//         }

//         console.log('The file was saved!');
//     });

//     // console.log(JSON.parse(req.body.images)[0]);
//     // var storage = multer.diskStorage({ //multers disk storage settings
//     //     destination: function (req, file, cb) {
//     //         cb(null, '../documents/')
//     //     },
//     //     filename: function (req, file, cb) {
//     //         cb(null, file.originalname)
//     //     }
//     // });
//     console.log('We are here 2');
//     // var upload = multer({ //multer settings
//     //     storage: storage
//     // }).single('file');

//     // upload(req, res, function(err) {
//     //     if (err) {
//     //         res.json({ error_code: 1, err_desc: err });
//     //         return;
//     //     }
//     //     res.json({ error_code: 0, err_desc: null });
//     // });

//     //})
//     //router.post('/newPart', upload.any(), function (req, res){
//     const d = domain.create();

//     console.info(req.files);
//     console.log(req.files);

//     d.on('error', function(error) {
//         console.log(error.stacktrace);
//         res.status(500).send({ error: error.message });
//     });

//     console.log('Images RV');
//     console.info(req.files);

//     d.run(function() {
//         console.log('Images RV 2');
//         const specs = {
//             weight: req.body.weight,
//             height: req.body.height,
//             width: req.body.width,
//             lenght: req.body.length,
//             mountWidth: req.body.mountWidth,
//             mountLength: req.body.mountLength,
//             voltsMin: req.body.voltsMin,
//             voltsMax: req.body.voltsMax,
//             voltMetric: req.body.voltMetric,
//             part4in1ESC: req.body.part4in1ESC,
//             ampsConstant: req.body.ampsConstant,
//             ampsPeak: req.body.ampsPeak,
//             firmware: req.body.firmware
//         };

//         const supportedESCFirmware = {
//             BLHeli: req.body.BLHeli,
//             BLHeli_S: req.body.BLHeli_S,
//             BLHeli_32: req.body.BLHeli_32,
//             SimonK: req.body.SimonK,
//             KISS: req.body.KISS,
//             Other: req.body.OtherESCFirmware
//         };

//         const supportedESCProtocol = {
//             PWM: req.body.PWM,
//             Oneshot125: req.body.Oneshot125,
//             Oneshot42: req.body.Oneshot42,
//             Multishot: req.body.Multishot,
//             Dshot150: req.body.Dshot150,
//             Dshot300: req.body.Dshot300,
//             Dshot600: req.body.Dshot600,
//             Dshot1200: req.body.Dshot1200,
//             ProShot: req.body.ProShot
//         };

//         const supportedFCPins = {
//             pinBEC33v: req.body.pinBEC33v,
//             pinBEC5v: req.body.pinBEC5v,
//             pinBEC9v: req.body.pinBEC9v,
//             pinVBat: req.body.pinVBat,
//             pinUARTS: req.body.pinUARTS,
//             pinCAM: req.body.pinCAM,
//             pinVTX: req.body.pinVTX,
//             pinBuzzer: req.body.pinBuzzer,
//             pinLED: req.body.pinLED
//         };

//         const features = {
//             supportedESCFirmware: supportedESCFirmware,
//             supportedESCProtocol: supportedESCProtocol,
//             supportedFCPins: supportedFCPins,
//             voltageMonitor: req.body.voltageMonitor,
//             currentMonitor: req.body.currentMonitor,
//             OSD: req.body.OSD,
//             blackbox: req.body.blackbox
//         };

//         const ratings = [];

//         // const images = [];
//         // if (req.body.images){
//         //     for (var i in req.body.images) {
//         //         if (req.body.images.hasOwnProperty(i)) {
//         //             //var f = req.body.images[i].split(',');
//         //             images.add({
//         //                 title:            req.body.images[i].name,
//         //                 type:             req.body.images[i].type,
//         //                 image:            req.body.images[i].image
//         //                 // image: {
//         //                 //     data:         fs.readFileSync(req.body.images[i]),
//         //                 //     contentType:  'image/png'
//         //                 //     // contentType:  req.body.images[i].imageContentType
//         //                 // }
//         //             });
//         //         }
//         //     }
//         //}

//         dronePartDAO.createDronePart(
//             {
//                 name: req.body.name,
//                 description: req.body.description,
//                 category: req.body.category,
//                 brand: req.body.brand,
//                 company: req.body.company,
//                 datePublished: req.body.datePublished,
//                 specs: specs,
//                 features: features,
//                 // images:           images,
//                 images: req.body.images,
//                 ratings: ratings
//             },
//             {
//                 success: function(f) {
//                     res.status(201).send({
//                         msg: 'dronePart created successfully: ' + req.body.name,
//                         data: f
//                     });
//                 },
//                 error: function(err) {
//                     res.status(500).send(err);
//                 }
//             }
//         );
//     });
// });

// READ all droneParts
router.get('/', (req, res) => {
    const d = domain.create();
    const { skip, count, category } = req.query;

    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        dronePartDAO.readdroneParts(category, skip, count, {
            success(droneParts) {
                res.status(200).send(JSON.stringify(droneParts));
            },
            error(err) {
                res.status(500).send(err);
            }
        });
    });
});

// READ dronePart by id
router.get('/:id', (req, res) => {
    const d = domain.create();
    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        dronePartDAO.readdronePartById(req.params.id, {
            success(dronePart) {
                res.status(200).send(JSON.stringify(dronePart));
            },
            error(err) {
                res.status(404).send(err);
            }
        });
    });
});

// READ dronePart by category
router.get('/:category', (req, res) => {
    const d = domain.create();
    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        dronePartDAO.readdroneParts(req.params.category, req.params.skip, req.params.count, {
            success(droneParts) {
                res.status(200).send(JSON.stringify(droneParts));
            },
            error(err) {
                res.status(500).send(err);
            }
        });
    });
});

// UPDATE dronePart
router.put('/:id', (req, res) => {
    const d = domain.create();
    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        const specs = {
            // TODO: Update part is missing a lot of objects
            height: req.body.height,
            width: req.body.width,
            lenght: req.body.lenght,
            weight: req.body.weight,
            voltsMin: req.body.voltsMin,
            voltsMax: req.body.voltsMax,
            amps: req.body.amps,
            ampsMax: req.body.ampsMax,
            firmware: req.body.firmware
        };

        const images = {
            title: req.body.imageTitle,
            type: req.body.imageType,
            path: req.body.imagePath
        };

        dronePartDAO.updatedronePart(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                brand: req.body.brand,
                company: req.body.company,
                datePublished: req.body.datePublished,
                specs: { specs },
                images: { images }
            },
            {
                success(f) {
                    res.status(200).send({
                        msg: `dronePart updated successfully: ${JSON.stringify(f)}`,
                        data: f
                    });
                },
                error(err) {
                    res.status(500).send(err);
                }
            }
        );
    });
});

// DELETE dronePart
router.delete('/:id', (req, res) => {
    const d = domain.create();
    d.on('error', (error) => {
        console.log(error.stacktrace);
        res.status(500).send({ error: error.message });
    });

    d.run(() => {
        dronePartDAO.deletedronePart(req.params.id, {
            success(f) {
                res.status(200).send({
                    msg: `dronePart deleted successfully: ${req.params.id}`,
                    data: f
                });
            },
            error(err) {
                res.status(500).send(err);
            }
        });
    });
});

module.exports = router;
