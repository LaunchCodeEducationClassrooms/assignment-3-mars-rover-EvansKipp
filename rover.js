class Rover {

  constructor(position,generatorWatts = 110, mode = 'NORMAL') {
    this.generatorWatts=generatorWatts;
    this.position = position;
    this.mode=mode;
    ;
   ;
  };

  receiveMessage(message) {
    let results=[];
    for (const command of message.commands) {
      if (command.commandType === 'MOVE') {
        if (this.mode === 'LOW_POWER') {
          results.push({ completed: false }) 
        } else {
          this.position = command.value
          results.push({ completed: true })
        };
      };
      if (command.commandType === 'STATUS_CHECK') {
        results.push({
          completed: true,
          roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position }
        });
      };
      if (command.commandType === 'MODE_CHANGE') {
        this.mode = command.value
        results.push({completed: true })
      };
    };
    return {message: message.name, results}
  };
};

module.exports = Rover;
