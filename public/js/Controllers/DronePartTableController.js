angular.module('FruitApp.DronePartTableController', [])
.controller('DronePartTableController', ['$scope', 'DronePartFactory', function ($scope, DronePartFactory) {

    //Get TOP droneParts
    $scope.$parent.DPTC_getTopDroneParts = function(){
        $scope.$parent.loading = true;
        //Load droneParts
        DronePartFactory.query().$promise.then(function(response) {
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
}]);
