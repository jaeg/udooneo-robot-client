
var SerialPort = require('serialport');
var parsers = SerialPort.parsers;

var parser = new parsers.Readline({})
var port = new SerialPort('/dev/ttyMCC', {
	buadrate: 9600
});

port.pipe(parser);

port.on('error', console.log);
port.on('open', () => console.log('Port open'));

var arduinoData = "empty";
var udooData = "empty";
parser.on('data', function(message) {
	arduinoData = message;
	udooData = sensors.Accelerometer.data();
});

var neo = require("./udooneo")
var sensors = neo.sensors;
sensors.Accelerometer.enable();

var redis = require("redis");
var client = redis.createClient({
	host:"redis-18915.c10.us-east-1-2.ec2.cloud.redislabs.com",
	port:"18915",
	password:"robot"
});
var lastCommand = ""
var update = function() {
	client.set("FromArduino",arduinoData)
	client.set("FromUdoo", udooData)
	client.get("FromUI", function(err, reply) {
		var command = reply.toString();
		if (lastCommand !== command) {
			port.write(command, function(err) {
			if (err != undefined) {
					console.log(err)
				}
			});
			console.log(command);
			lastCommand = command;
		}

	});

	setTimeout(update, 100)
}

setTimeout(update, 100) 


