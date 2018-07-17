
	var SerialPort = require('serialport');
	var parsers = SerialPort.parsers;

	var parser = new parsers.Readline({
	})
	var port = new SerialPort('/dev/ttyMCC', {
		buadrate: 9600
	});

	port.pipe(parser);

	port.on('error', console.log);
	port.on('open', () => console.log('Port open'));
	



var neo = require("./udooneo")
var sensors = neo.sensors;
sensors.Accelerometer.enable();

var WebSocketClient = require('websocket').client;
var http = require('http');

var client = new WebSocketClient();
client.on('connectFailed', function(error) {
	dead = true
	console.log("Connect error: " + error.toString());
			setTimeout(function() {
			console.log("Reattempting connection");
			client.connect('ws://192.168.1.70:8083/', 'robot');
		}, 100);
})

var dead = true;
client.on('connect', function(connection) {
	console.log('Connected to cloud');
	dead = false
	connection.on('error', function(error) {
		console.log('Connection Error:' + error.toString());
	});

	connection.on('close', function() {
		dead = true
		console.log('robot connection closed');
		setTimeout(function() {
			console.log("Reattempting connection");
			client.connect('ws://192.168.1.70:8083/', 'robot');
		}, 100);
	});

	connection.on('message', function(message) {
		console.log(message)
		if (message.type === 'utf8') {
			port.write(message.utf8Data, function(err) {
				if (err != undefined) {
					console.log(err)
				}
			});
		}
	});

	parser.on('data', function(message) {
		if (dead == false) {
			connection.sendUTF("FromArduino:" + message);
			connection.sendUTF("FromUdoo:" +sensors.Accelerometer.data());
		}
	});
});

client.connect('ws://192.168.1.70:8083/', 'robot');


