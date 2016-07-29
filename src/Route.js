let GotoZipcodeToBarcode = require('./GotoZipcodeToBarcode');
let GotoBarcodeToZipcode = require('./GotoBarcodeToZipcode');
let ExitCommand = require('./ExitCommand');
let MainCommand = require('./MainCommand');

class Route {
    constructor() {
        this.mapping = {
            "1": new GotoZipcodeToBarcode(),
            "2": new GotoBarcodeToZipcode(),
            "3": new ExitCommand(),
            "main": new MainCommand()
        }
    }

    execute(input) {
        let response;
        let command = this.mapping[input];
        let result = "";
        if (command) {
            response = command.execute(input);
            result += response._text;
        } else if (this.mapping["*"]) {
            response = this.mapping["*"].execute(input);
            result += response._text;
        } else {
            return "No such command\nPlease give the right input";
        }

        if (response._next) {
            let newResponse;
            do {
                newResponse = response._next.execute();
                result += "\n";
                result += newResponse._text;
            } while (newResponse.next);
        }

        if (response._reset) {
            this.reset();
            result += "\n\n";
            result += this.mapping["main"].execute()._text;
        }

        if (response._newMapping) {
            this.mapping = response._newMapping;
        }
        return result;

    }

    reset() {
        this.mapping = {
            "1": new GotoZipcodeToBarcode(),
            "2": new GotoBarcodeToZipcode(),
            "3": new ExitCommand(),
            "main": new MainCommand()
        }
    }
}

module.exports = Route;