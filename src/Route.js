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
            result += response.text;
        } else if (this.mapping["*"]) {
            response = this.mapping["*"].execute(input);
            result += response.text
        } else {
            return "No such command\nPlease give the right input";
        }

        if (response.next) {
            let newResponse;
            do {
                newResponse = response.next.execute();
                result += "\n";
                result += newResponse.text;
            } while (newResponse.next);
        }

        if (response.reset) {
            this.reset();
        }

        if (response.newMapping) {
            this.mapping = response.newMapping;
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