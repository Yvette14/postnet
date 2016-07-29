let CommandResponse = require('./CommandResponse');
class MainCommand {
    execute() {

           let text= `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`;
           return new CommandResponse(text,false,false,false);

    }
}

module.exports = MainCommand;