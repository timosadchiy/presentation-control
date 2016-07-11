'use strict';

module.exports = function () {
    var config = require('./config')(),
        bleno = require('bleno'),
        localName = config.advertiseName,
        serviceUUID = config.serviceUuid,
        controlCharacteristicUuid = config.controlCharacteristicUuid,
        BlenoPrimaryService = bleno.PrimaryService,
        ControlCharacteristic = require('./control-characteristic');

    console.log('bleno - echo');

    bleno.on('stateChange', function (state) {
        console.log('on -> stateChange: ' + state);

        if (state === 'poweredOn') {
            bleno.startAdvertising(localName, [serviceUUID]);
        } else {
            bleno.stopAdvertising();
        }
    });

    bleno.on('advertisingStart', function (error) {
        console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

        if (!error) {
            bleno.setServices([
                new BlenoPrimaryService({
                    uuid: serviceUUID,
                    characteristics: [
                        new ControlCharacteristic(controlCharacteristicUuid)
                    ]
                })
            ]);
        }
    });

     bleno.on('servicesSet', function (error) {
        console.log('servicesSet: ' + (error ? 'error' + error : 'success'));
    });

    bleno.on('servicesSetError', function (error) {
        console.log('servicesSetError: ' + (error ? 'error' + error : 'success'));
    });
};