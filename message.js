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
let commands = [("MODE_CHANGE"),('MOVE'),('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);

console.log(commands);
console.log(message);



module.exports = Message;