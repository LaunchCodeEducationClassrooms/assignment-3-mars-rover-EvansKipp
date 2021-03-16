class Rover {
  constructor (position, generatorWatts = 110) {
    this.position = position,
    this.mode = 'NORMAL',
    this.generatorWatts = generatorWatts
  }
  receiveMessage(message) {
    let outputArray = [];
    for (let n = 0; n < message.commands.length; n++) {
      if (message.commands[n].commandType === "MOVE") {
        if (this.mode === 'LOW_POWER') {
          outputArray.push({completed: false, position: this.position})
        }
        else {outputArray.push({completed: true, position: message.commands[n].value});
        this.position = this.position + message.commands[n].value;
        }
      }
      else if (message.commands[n].commandType === "STATUS_CHECK") {
        outputArray.push({completed: true, mode: this.mode, generatorWatts: this.generatorWatts, position: this.position});
      }
      else if (message.commands[n].commandType === "MODE_CHANGE") {
        outputArray.push({completed: true});
        this.mode = message.commands[n].value;
      }
      else {
        outputArray.push({completed: false});
        message.name = message.name + " is an Unknown Command"
      }
    }
    
    return {
      roverMessage: message.name,
      results: outputArray
    };
  };

};


module.exports = Rover;



