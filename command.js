class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
     if (!commandType) {
       throw Error("Command type required.");
     }
     this.value = value;
   }
 
 }
let modeCommand =[new Command('MODE_CHANGE'),new Command("MOVE"),new Command("STATUS_CHECK")];
 console.log(modeCommand);

 
 module.exports = Command;