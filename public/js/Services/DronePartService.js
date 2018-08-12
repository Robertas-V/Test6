angular.module('FruitApp.DronePartService', [])
.factory('DronePartFactory', function ($resource) {
    return $resource(
        '/api/0.1/dronePart/:id', {
            id: '@id'
        }, {
        //     query: {
        //         method: 'GET',
        //         isArray: false
        //     }
        // }, {
            update: {
                method: 'PUT'
            }
        }
    );
});
