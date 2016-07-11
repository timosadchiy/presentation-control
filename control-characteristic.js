var config = require('./config'),
    actionKeyMap = require('./ble-action-robot-map')(),
    util = require('util'),
    bleno = require('bleno'),
    robot = require("robotjs"),
    BlenoCharacteristic = bleno.Characteristic,
    StringDecoder = require('string_decoder').StringDecoder;

ControlCharacteristic = function (characteristicUUID) {
    ControlCharacteristic.super_.call(this, {
        uuid: characteristicUUID,
        properties: ['write'],
        value: null
    });
    this._value = new Buffer(0);
};

util.inherits(ControlCharacteristic, BlenoCharacteristic);

ControlCharacteristic.prototype.onReadRequest = function (offset, callback) {
    console.log('ControlCharacteristic - onReadRequest');
    callback(this.RESULT_SUCCESS, this._value);
};

ControlCharacteristic.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
    var decoder = new StringDecoder('utf8'),
        action = decoder.write(data).replace(/-/gi, '').toLowerCase();
    console.log(actionKeyMap[action]);
    if (actionKeyMap[action] != undefined) {
        robot.keyTap(actionKeyMap[action]);
    }
    callback(this.RESULT_SUCCESS);
};

module.exports = ControlCharacteristic;