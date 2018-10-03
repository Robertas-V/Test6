var app = angular.module('FruitApp', [
  'ngRoute',
  'ngResource',
  'FruitApp.FruitService',
  'FruitApp.UserService',
  'FruitApp.DronePartService',
  'FruitApp.LoginController',
  'FruitApp.TableController',
  'FruitApp.CardController',
  'FruitApp.DronePartTableController'])
.controller('MainController',  ['$scope', '$http', function ($scope, $http) {
    //State vars initialization
    $scope.loading = false;
    $scope.loggedIn = getCookie('username') !== "";
    $scope.fruit={};
    $scope.editing = false;
    $scope.showLogIn = false;

    //Add fruit button handler
    $scope.add_fruit = function(){
        $scope.fruit={};
        $scope.editing = true;

        //Floating label layout fix
        $('.mdl-textfield').removeClass('is-focused');
    };

    //Logout button handler
    $scope.logout = function(e){
        delete_cookie('username');
        location.reload();
    };

}]);
