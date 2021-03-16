class Message {
  constructor(name, commands) {
    this.name = name;
    if (!name) {
      throw Error('Message name required.');
    }
  this.name=name;
  this.commands=commands;
  }
}
let commands = [('STATUS_CHECK'), ('MOVE', 20),("MODE_CHANGE")];
let message = new Message('Another message!', commands);

console.log(commands);
console.log(message);



module.exports = Message;