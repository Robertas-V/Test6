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
        if($scope.$parent.fruit._id === undefined){
            //Adding fruit -> POST
            fruitFactory.save({
                name: $scope.$parent.fruit.name,
                description: $scope.$parent.fruit.description,
                price: $scope.$parent.fruit.price
            }, function(response) {
                    console.log(response);
                    $scope.$parent.editing = false;
                    $scope.$parent.update_fruits();
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
