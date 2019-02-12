'use strict';

var awsIot = require('aws-iot-device-sdk');
var config = require('../config.json')

const device = awsIot.device({
  host: config.host,
  keyPath: config.keyPath,
  certPath: config.certPath,
  caPath: config.caPath,
  clientId: config.clientId
});

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
  .on('connect', () => {
    console.log('connect');
    device.subscribe('receive_topic_1');
    device.publish('updateParkingStatus', JSON.stringify(
      {
        lat: "-25.4448876",
        long: "-49.3583164",
        parkingId: "E1_ParkingUP",
        parkingLots: [
          {
            id: "01",
            status: "FREE"
          }, {
            id: "02",
            status: "FREE"
          }, {
            id: "03",
            status: "FREE"
          }, {
            id: "04",
            status: "FREE"
          }, {
            id: "05",
            status: "FREE"
          }, {
            id: "06",
            status: "FREE"
          }
        ]
      }
    ));
    console.log('Message send Succesfully..');
  });

device
  .on('message', (topic, payload) => {
    console.log('message', topic, payload.toString());
  });