let CommandResponse = require('../src/CommandResponse');

class ExitCommand {
    execute() {
        let text = "Thank U!Good Bye!";
        return new CommandResponse(text, false, false, false);
    }
}

module.exports = ExitCommand;