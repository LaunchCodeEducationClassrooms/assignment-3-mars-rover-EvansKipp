const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');
const assert = require('assert');
// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  
  it("constructor sets position and default values for mode and generatorWatts.", function() {
    let perseveranceRover = new Rover(1991)
    assert.strictEqual(perseveranceRover.position,1991);
    expect(perseveranceRover.generatorWatts).toEqual(110)
  });

  it("response returned by receiveMessage contains name of message", function() {
    let roverMessage = new Message("Test with two commands", [])
    let perseveranceRover = new Rover(1991)
    expect(perseveranceRover.receiveMessage(roverMessage).message).toEqual(roverMessage.name)
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let roverMessage = new Message("Test with two commands", [new Command('STATUS_CHECK', ''), new Command('STATUS_CHECK', '')])
    let perseveranceRover = new Rover(1991)
    expect(roverMessage.commands.length).toEqual(perseveranceRover.receiveMessage(roverMessage).results.length)
  });

  it("responds correctly to status check command", function() {
    let perseveranceRover = new Rover(1991)
    let roverMessage = new Message("Test with two commands", [new Command('STATUS_CHECK', '')])
    expect(perseveranceRover.receiveMessage(roverMessage).results).toContain(jasmine.objectContaining({
      roverStatus: {
        mode: perseveranceRover.mode,
        generatorWatts: perseveranceRover.generatorWatts,
        position: perseveranceRover.position
      }
    }));
  });

  it("responds correctly to mode change command", function() {
    let perseveranceRover = new Rover(1991)
    let roverMessageLowPower = new Message("Low_Power", [new Command('MODE_CHANGE', 'LOW_POWER')])
    expect(perseveranceRover.receiveMessage(roverMessageLowPower).results[0].completed).toBeTrue()
    expect(perseveranceRover.mode).toEqual('LOW_POWER')
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let perseveranceRover = new Rover(1991)
    perseveranceRover.mode = 'LOW_POWER'
    let roverMessageMoveLowPower = new Message("Move", [new Command('MOVE', 546)])
    expect(perseveranceRover.receiveMessage(roverMessageMoveLowPower).results[0].completed).toBeFalse()
  });

  it("responds with position for move command", function() {
    let perseveranceRover = new Rover(1991)
    let roverMessageMove = new Message("Move", [new Command('MOVE', 546)])
    perseveranceRover.receiveMessage(roverMessageMove)
    expect(perseveranceRover.position).toEqual(roverMessageMove.commands[0].value)
  });
});