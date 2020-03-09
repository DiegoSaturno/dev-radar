const socketio = require('socket.io');
const ArrayUtils = require('../utils/ArrayUtils');
const { getDistanceFromLatLonInKm } = require('../utils/DistanceUtils');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on('connection', (socket) => {
    console.log(`Client connected. ${socket.id}`);
    console.log(socket.handshake.query);

    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: ArrayUtils.stringAsArray(techs),
    })
  });
};

exports.findConnections = (coordinates, techs) => {

  return connections.filter((connection) => {
    return getDistanceFromLatLonInKm(coordinates, connection.coordinates) <= 10
      && connection.techs.some(t => techs.includes(t));
  });
};

exports.sendMessage = (messageTo, message, data) => {
  messageTo.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
}
