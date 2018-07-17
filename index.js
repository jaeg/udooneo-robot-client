
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
parser.on('data', console.log);

var neo = require("./udooneo")
var sensors = neo.sensors;
sensors.Accelerometer.enable();
console.log(sensors.Accelerometer.data());


//Motors
var directionA = new neo.GPIO(28)
var pwmA = new neo.GPIO(19)

var directionB = new neo.GPIO(29)
var pwmB = new neo.GPIO(27)

directionA.out();
directionB.out();
pwmA.out();
pwmB.out();



