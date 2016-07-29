let ZipcodeToBarcode = require('./ZipcodeToBarcode');
let CommandResponse = require('./CommandResponse');

class TranslateZipcodeToBarcode {
    constructor(next) {
        this.next = next;
    }

    execute(input) {
        let coreResponse = new ZipcodeToBarcode().execute(input);
        if (coreResponse._type) {
            let text = "transformResult is " + coreResponse._text;
            return new CommandResponse(text,false,true,false);
        } else {
            let text = "Please give right input";
            return new CommandResponse(text,this.next,false,false);
        }
    }
}

module.exports = TranslateZipcodeToBarcode;