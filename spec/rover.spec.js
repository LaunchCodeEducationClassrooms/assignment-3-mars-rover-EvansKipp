const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let roverPosition = new Rover ("Position");
    assert.strictEqual(roverPosition.position, "Position");
    assert.strictEqual(roverPosition.mode, "NORMAL");
    assert.strictEqual(roverPosition.generatorWatts, 110)
  });

  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.roverMessage,'Test message with two commands');
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results.length, 2);
  });

  it("responds correctly to status check", function () {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    assert.deepStrictEqual(response, {roverMessage: 'Test message with two commands', results: [{completed: true, mode: 'NORMAL', generatorWatts: 110, position: 98382}]});
    assert.strictEqual(response.results[0].completed, true);
    assert.strictEqual(response.results[0].mode, 'NORMAL');
    assert.strictEqual(response.results[0].generatorWatts, 110);
    assert.strictEqual(response.results[0].position, 98382);
  });

  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    assert.strictEqual(rover.mode, 'LOW_POWER');
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command ('MOVE', 350)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results[1].completed, false);
  });

  it("responds with position for move command", function() {
    let commands = [new Command ('MOVE', 98732)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results[0].position, 98732);
  });

  it("completed false and a message for an unknown command", function() {
    let commands = [new Command ('PULLBACK', 239)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results[0].completed, false);
    assert.strictEqual("Test message with two commands is an Unknown Command", response.roverMessage)
  });

});