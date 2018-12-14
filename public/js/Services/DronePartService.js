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
                // 'Content-Type': 'multipart/form-data'
                // headers: { 'Content-Type': undefined },
                // headers: { 'Content-Type': undefined },
                // headers: { 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryWfaUCcM8XZucQ4jq', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' },
                data: {
                  // model : {
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
                    part4in1ESC:        '@part4in1ESC',
                    ampsConstant:       '@ampsConstant',
                    ampsPeak:           '@ampsPeak',
                    firmware:           '@firmware',

                    BLHeli:             '@BLHeli',
                    BLHeli_S:           '@BLHeli_S',
                    BLHeli_32:          '@BLHeli_32',
                    KISS:               '@KISS',
                    SimonK:             '@SimonK',
                    OtherESCFirmware:   '@OtherESCFirmware',

                    PWM:                '@PWM',
                    Oneshot125:         '@Oneshot125',
                    Oneshot42:          '@Oneshot42',
                    Multishot:          '@Multishot',
                    Dshot150:           '@Dshot150',
                    Dshot300:           '@Dshot300',
                    Dshot600:           '@Dshot600',
                    Dshot1200:          '@Dshot1200',
                    ProShot:            '@ProShot',

                    pinBEC33v:          '@pinBEC33v',
                    pinBEC5v:           '@pinBEC5v',
                    pinBEC9v:           '@pinBEC9v',
                    pinVBat:            '@pinVBat',
                    pinUARTS:           '@pinUARTS',
                    pinCAM:             '@pinCAM',
                    pinVTX:             '@pinVTX',
                    pinBuzzer:          '@pinBuzzer',
                    pinLED:             '@pinLED',

                    voltageMonitor:     '@voltageMonitor',
                    currentMonitor:     '@currentMonitor',
                    OSD:                '@OSD',
                    blackbox:           '@blackbox',
                  // },
                  // file: {
                    // ,
                    //
                    images:             '@images'
                  // }
                }
            }
        },
        '/api/0.1/dronePart/:category', {
            category: '@category'
        }
    );
});
