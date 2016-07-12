# presentation-control
Node.js app for switching presentation slides by triggering left and right keystrokes reacting on swipe events received from the Android app [presentation-control-app](https://github.com/timosadchiy/presentation-control-app).

# Getting started
1. Install Node.js.
2. Clone the project.
3. Run `npm install`.
4. Make sure you meet all the Prerequisites of the Node.js library [Bleno](https://github.com/sandeepmistry/bleno/).
5. Install [presentation-control-app](https://github.com/timosadchiy/presentation-control-app) on an Android phone.
6. Run `npm index.js`.
7. Enjoy.

**Note:** `serviceUuid` and `controlCharacteristicUuid` must match the constants `CONTROL_SERVICE_UUID` and `CONTROL_CHARACTERISTIC_UUID` respectively in the `BleManager.java` of the [presentation-control-app](https://github.com/timosadchiy/presentation-control-app). 