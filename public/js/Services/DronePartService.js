angular.module('FruitApp.DronePartService', [])
.factory('DronePartFactory', function ($resource) {
    return $resource(
        '/api/0.1/dronePart/:id', {
            id: '@id'
        },
        '/api/0.1/dronePart/:category', {
            category: '@category'
        }, {
        //     query: {
        //         method: 'GET',
        //         url: '/api/0.1/user/login',
        //         params: {
        //             username: '@username',
        //             password: '@password'
        //         }
        //         // isArray: false
        //     }
        // }, {
            update: {
                method: 'PUT'
            }
        }
    );
});
