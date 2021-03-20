class Rover {
  constructor (position, generatorWatts = 110) {
    this.position = position,
    this.mode = 'NORMAL',
    this.generatorWatts = generatorWatts
  }

receiveMessage(message) {
  let resultsArray = [];

for (let i=0;i<commands.length;i++){
  if (message.commands[i].commandType==="MOVE"){
    resultsArray.push({completed: true, position: message.commands[i].value});
    this.position = this.position + message.commands[i].value;
  }

if (message.commands[i].commandType === "STATUS_CHECK") {
        resultsArray.push({completed: true,mode: this.mode, generatorWatts: this.generatorWatts, position: this.position});
      }


  if (message.commands[i].commandType === "MODE_CHANGE") {
        resultsArray.push({completed: true});
        this.mode = message.commands[i].value;
      }
  }
    
    return {
      roverMessage:message.name,
      results: resultsArray
    };
};
};
let commands = [("MOVE"),('MODE_CHANGE', 'LOW_POWER'), ('STATUS_CHECK')];
let message = ('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

console.log(response);


module.exports = Rover;




