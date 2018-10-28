angular.module('FruitApp.DronePartTableController', [])
.controller('DronePartTableController', ['$scope', 'DronePartFactory', '$location', function ($scope, DronePartFactory, $location) {

    //Get TOP droneParts
    $scope.$parent.DPTC_getTopDroneParts = function(){
        $scope.$parent.loading = true;
        //Load droneParts
        DronePartFactory.query().$promise.then(function(response) {
            //$('tbody').html('');
            $scope.$parent.dronePart_list = response;
            $scope.$parent.loading = false;

        }, function(response) {
            //error
            console.error(response);
        });
    };

    // Jump to details page
    $scope.$parent.dronePartClick =  function(id) {
        $scope.$parent.loading = true;
        // $scope.$parent.editing = true;

        // $location.path("details/" + id);
        // $location.url("details/" + id);
        window.location.href = 'details/' + id;
    };

    // Get drone part details by ID
    $scope.$parent.DPTC_getDronePartById = function(id){
        $scope.$parent.loading = true;
        // $scope.$parent.editing = true;
        DronePartFactory.get({id: id},
            function(response) {
                console.log(response);
                $scope.$parent.dronePart = response;
                $scope.$parent.loading = false;

                //Floating label layout fix
                $('.mdl-textfield').addClass('is-focused');
            }, function(response) {
                //error
                console.error(response);
        });
    };


    $scope.$parent.get_dronePartsByCategory = function(category){
        $scope.$parent.loading = true;
        //Load droneParts
        DronePartFactory.query({category: category}).$promise.then(function(response) {
            //$('tbody').html('');
            $scope.$parent.dronePart_list = response;
            $scope.$parent.loading = false;

            $scope.dronePartClick =  function(id) {
                $scope.$parent.loading = true;
                $scope.$parent.editing = true;
                DronePartFactory.get({id: id},
                    function(response) {
                        console.log(response);
                        $scope.$parent.dronePart = response;
                        $scope.$parent.loading = false;

                        //Floating label layout fix
                        $('.mdl-textfield').addClass('is-focused');
                    }, function(response) {
                        //error
                        console.error(response);
                });
            };
        }, function(response) {
            //error
            console.error(response);
        });
    };

    //
    $scope.add_new_part = function(){
        $scope.$parent.loading = true;
        if($scope.$parent.newDronePart._id === undefined){
            //Adding newDronePart -> POST
            DronePartFactory.insert({
                name:               $scope.$parent.newDronePart.name,
                description:        $scope.$parent.newDronePart.description,
                category:           $scope.$parent.newDronePart.category,
                brand:              $scope.$parent.newDronePart.brand,
                company:            $scope.$parent.newDronePart.company,
                datePublished:      $scope.$parent.newDronePart.datePublished,

                weight:             $scope.$parent.newDronePart.specs.weight,
                height:             $scope.$parent.newDronePart.specs.height,
                width:              $scope.$parent.newDronePart.specs.width,
                lenght:             $scope.$parent.newDronePart.specs.length,
                mountWidth:         $scope.$parent.newDronePart.specs.mountWidth,
                mountLength:        $scope.$parent.newDronePart.specs.mountLength,
                voltsMin:           $scope.$parent.newDronePart.specs.voltsMin,
                voltsMax:           $scope.$parent.newDronePart.specs.voltsMax,
                voltMetric:         $scope.$parent.newDronePart.specs.voltMetric,
                part4in1ESC:        $scope.$parent.newDronePart.specs.part4in1ESC,
                ampsConstant:       $scope.$parent.newDronePart.specs.ampsConstant,
                ampsPeak:           $scope.$parent.newDronePart.specs.ampsPeak,
                firmware:           $scope.$parent.newDronePart.specs.firmware,

                BLHeli:             $scope.$parent.newDronePart.features.BLHeli,
                BLHeli_S:           $scope.$parent.newDronePart.features.BLHeli_S,
                BLHeli_32:          $scope.$parent.newDronePart.features.BLHeli_32,
                KISS:               $scope.$parent.newDronePart.features.KISS,
                SimonK:             $scope.$parent.newDronePart.features.SimonK,
                OtherESCFirmware:   $scope.$parent.newDronePart.features.OtherESCFirmware,

                PWM:                $scope.$parent.newDronePart.features.PWM,
                Oneshot125:         $scope.$parent.newDronePart.features.Oneshot125,
                Oneshot42:          $scope.$parent.newDronePart.features.Oneshot42,
                Multishot:          $scope.$parent.newDronePart.features.Multishot,
                Dshot150:           $scope.$parent.newDronePart.features.Dshot150,
                Dshot300:           $scope.$parent.newDronePart.features.Dshot300,
                Dshot600:           $scope.$parent.newDronePart.features.Dshot600,
                Dshot1200:          $scope.$parent.newDronePart.features.Dshot1200,
                ProShot:            $scope.$parent.newDronePart.features.ProShot,

                pinBEC33v:          $scope.$parent.newDronePart.features.pinBEC33v,
                pinBEC5v:           $scope.$parent.newDronePart.features.pinBEC5v,
                pinBEC9v:           $scope.$parent.newDronePart.features.pinBEC9v,
                pinVBat:            $scope.$parent.newDronePart.features.pinVBat,
                pinUARTS:           $scope.$parent.newDronePart.features.pinUARTS,
                pinCAM:             $scope.$parent.newDronePart.features.pinCAM,
                pinVTX:             $scope.$parent.newDronePart.features.pinVTX,
                pinBuzzer:          $scope.$parent.newDronePart.features.pinBuzzer,
                pinLED:             $scope.$parent.newDronePart.features.pinLED,

                voltageMonitor:     $scope.$parent.newDronePart.features.voltageMonitor,
                currentMonitor:     $scope.$parent.newDronePart.features.currentMonitor,
                OSD:                $scope.$parent.newDronePart.features.OSD,
                blackbox:           $scope.$parent.newDronePart.features.blackbox,

                images:             $scope.$parent.newDronePart.images

            }, function(response) {
                    console.log(response);
                    $scope.$parent.editing = false;
                    // TODO: if the real path is with the / in the end, then it will redirect to details/details/. Fix this
                    window.location.href = 'details/' + response.data._id;
            }, function(response) {
                    //error
                    console.error(response);
            });

        }else{
            //Editing fruit -> PUT
            fruitFactory.update({id: $scope.$parent.fruit._id}, {
                name: $scope.$parent.fruit.name,
                description: $scope.$parent.fruit.description,
                price: $scope.$parent.fruit.price
            },function(response) {
                console.log(response);
                $scope.$parent.editing = false;
                $scope.$parent.update_fruits();
            }, function(response) {
                //error
                console.error(response);
            });
        }
    };
}]);
