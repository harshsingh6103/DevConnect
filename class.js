const EventEmitter = require("events");


var eventEmitter = new EventEmitter();

var connectHandler = function connected() {
  console.log("Connection successful");

  eventEmitter.emit("data received");
};

eventEmitter.on("connection", connectHandler);

eventEmitter.on("data received", function () {
  console.log("Data received successfully");
});

eventEmitter.emit("connection");

eventEmitter.emit("data received");

console.log("Program end");


addEventListner("")