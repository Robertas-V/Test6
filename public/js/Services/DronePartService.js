angular.module('FruitApp.DronePartService', [])
.factory('DronePartFactory', function ($resource) {
    return $resource(
        '/api/0.1/dronePart/:id', {
            id: '@id'
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
            },
            insert: {
                method: 'POST',
                url: '/api/0.1/dronePart/newPart',
                params: {
                    name:               '@name',
                    description:        '@description',
                    category:           '@category',
                    brand:              '@brand',
                    company:            '@company',
                    datePublished:      '@datePublished',

                    weight:             '@weight',
                    height:             '@height',
                    width:              '@width',
                    lenght:             '@length',
                    mountWidth:         '@mountWidth',
                    mountLength:        '@mountLength',
                    voltsMin:           '@voltsMin',
                    voltsMax:           '@voltsMax',
                    voltMetric:         '@voltMetric',
                    ampsConstant:       '@ampsConstant',
                    ampsPeak:           '@ampsPeak',
                    firmware:           '@firmware',

                    supportedFirmware:  '@supportedFirmware',
                    supportProtocols:   '@supportProtocols',
                    voltageMonitor:     '@voltageMonitor',
                    currentMonitor:     '@currentMonitor',
                    OSD:                '@OSD',
                    BEC:                '@BEC',
                    externalBuzzer:     '@externalBuzzer',
                    LEDStrip:           '@LEDStrip'
                }
            }
        },
        '/api/0.1/dronePart/:category', {
            category: '@category'
        }
    );
});
