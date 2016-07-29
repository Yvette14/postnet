let BarcodeToZipcode = require('./BarcodeToZipcode');

class TranslateBarcodeToZipcode {
    constructor(next) {
        this.next = next;
    }

    execute(input) {
        let coreResponse = new BarcodeToZipcode().execute(input);
        if (coreResponse.type) {
            return {
                text: "transformResult is " + coreResponse.text,
                next: false,
                reset: true,
                newMapping: false
            }
        } else {
            return {
                text: "Please give right input",
                next: this.next,
                reset: false,
                newMapping: false
            }
        }
    }
}

module.exports = TranslateBarcodeToZipcode;