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

                weight:             $scope.$parent.newDronePart.weight,
                height:             $scope.$parent.newDronePart.height,
                width:              $scope.$parent.newDronePart.width,
                lenght:             $scope.$parent.newDronePart.length,
                mountWidth:         $scope.$parent.newDronePart.mountWidth,
                mountLength:        $scope.$parent.newDronePart.mountLength,
                voltsMin:           $scope.$parent.newDronePart.voltsMin,
                voltsMax:           $scope.$parent.newDronePart.voltsMax,
                voltMetric:         $scope.$parent.newDronePart.voltMetric,
                ampsConstant:       $scope.$parent.newDronePart.ampsConstant,
                ampsPeak:           $scope.$parent.newDronePart.ampsPeak,
                firmware:           $scope.$parent.newDronePart.firmware,

                supportedFirmware:  $scope.$parent.newDronePart.supportedFirmware,
                supportProtocols:   $scope.$parent.newDronePart.supportProtocols,
                voltageMonitor:     $scope.$parent.newDronePart.voltageMonitor,
                currentMonitor:     $scope.$parent.newDronePart.currentMonitor,
                OSD:                $scope.$parent.newDronePart.OSD,
                BEC:                $scope.$parent.newDronePart.BEC,
                externalBuzzer:     $scope.$parent.newDronePart.externalBuzzer,
                LEDStrip:           $scope.$parent.newDronePart.LEDStrip
            }, function(response) {
                    console.log(response);
                    $scope.$parent.editing = false;
                    // $scope.$parent.update_fruits();
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
