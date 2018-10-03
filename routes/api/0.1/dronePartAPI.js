var express = require('express'),
    router = express.Router(),
    domain = require('domain'),
    dronePartDAO = require('./../../../model/DAO/dronePartDAO');

//CREATE a new dronePart
router.post('/newPart', function (req, res){
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        var specs = ({
            height:         req.body.height,
            width:          req.body.width,
            lenght:         req.body.length,
            weight:         req.body.weight,
            voltsMin:       req.body.voltsMin,
            voltsMax:       req.body.voltsMax,
            amps:           req.body.amps,
            ampsMax:        req.body.ampsMax,
            firmware:        req.body.firmware
        });

        var images = [];
        var ratings = [];

        if (req.body.imagePath !== undefined){
            images.add({
                title:          req.body.imageTitle,
                type:           req.body.imageType,
                path:           req.body.imagePath
            });
        }

        dronePartDAO.createdronePart({
                name:           req.body.name,
                description:    req.body.description,
                category:       req.body.category,
                brand:          req.body.brand,
                company:        req.body.company,
                datePublished:  req.body.datePublished,
                specs:          specs,
                images:         images,
                ratings:        ratings
            }, {
            success: function(f){
                res.status(201).send({msg: 'dronePart created succesfully: '+req.body.name, data: f});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

//READ all droneParts
router.get('/', function(req, res, next) {
    var d = domain.create();
    var skip = req.query.skip;
    var count = req.query.count;
    var category = req.query.category;
    console.log(req.query);

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        dronePartDAO.readdroneParts(category, skip, count, {
            success: function(droneParts){
                res.status(200).send(JSON.stringify(droneParts));
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

//READ dronePart by id
router.get('/:id', function (req, res){
    var d = domain.create();
    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});

    });

    d.run(function(){
        dronePartDAO.readdronePartById(req.params.id ,{
            success: function(dronePart){
                res.status(200).send(JSON.stringify(dronePart));
            },
            error: function(err){
                res.status(404).send(err);
            }
        });
    });
});



//READ dronePart by category
router.get('/:category', function (req, res){
    var d = domain.create();
    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});

    });

    d.run(function(){
        dronePartDAO.readdroneParts(req.params.category, req.params.skip, req.params.count, {
            success: function(droneParts){
                res.status(200).send(JSON.stringify(droneParts));
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });

    // d.run(function(){
    //     dronePartDAO.readdronePartById(req.params.id ,{
    //         success: function(dronePart){
    //             res.status(200).send(JSON.stringify(dronePart));
    //         },
    //         error: function(err){
    //             res.status(404).send(err);
    //         }
    //     });
    // });
});

//UPDATE dronePart
router.put('/:id', function (req, res){
    var d = domain.create();
    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
          var specs = ({
              height:         req.body.height,
              width:          req.body.width,
              lenght:         req.body.lenght,
              weight:         req.body.weight,
              voltsMin:       req.body.voltsMin,
              voltsMax:       req.body.voltsMax,
              amps:           req.body.amps,
              ampsMax:        req.body.ampsMax,
              firmware:        req.body.firmware
          });

          var images = ({
              title:          req.body.imageTitle,
              type:           req.body.imageType,
              path:           req.body.imagePath
          });

        dronePartDAO.updatedronePart(req.params.id, {
                name:           req.body.name,
                description:    req.body.description,
                category:       req.body.category,
                brand:          req.body.brand,
                company:        req.body.company,
                datePublished:  req.body.datePublished,
                specs:          { specs },
                images:         { images }
            }, {
            success: function(f){
                res.status(200).send({msg: 'dronePart updated succesfully: '+JSON.stringify(f), data: f});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

//DELETE dronePart
router.delete('/:id', function (req, res){
    var d = domain.create();
    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        dronePartDAO.deletedronePart(req.params.id ,{
            success: function(f){
                res.status(200).send({msg: 'dronePart deleted succesfully: ' + req.params.id, data: f});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

module.exports = router;
