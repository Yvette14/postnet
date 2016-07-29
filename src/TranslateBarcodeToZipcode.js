let BarcodeToZipcode = require('./BarcodeToZipcode');
let CommandResponse = require('./CommandResponse');

class TranslateBarcodeToZipcode {
    constructor(next) {
        this.next = next;
    }

    execute(input) {
        let coreResponse = new BarcodeToZipcode().execute(input);
        if (coreResponse._type) {
            let text = "transformResult is " + coreResponse._text;
            return new CommandResponse(text, false, true, false);
        } else {
            let text = "Please give right input";
            return new CommandResponse(text, this.next, false, false);
        }
    }
}

module.exports = TranslateBarcodeToZipcode;