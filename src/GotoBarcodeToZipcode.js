let TranslateBarcodeToZipcode = require('./TranslateBarcodeToZipcode')

class GotoBarcodeToZipcode {
    execute() {
        let self = this;
        return {
            text: `Please input bar code:`,
            next: false,
            reset: false,
            newMapping: {
                "*": new TranslateBarcodeToZipcode(self)
            }
        };
    }
}

module.exports = GotoBarcodeToZipcode;