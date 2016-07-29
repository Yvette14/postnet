let TranslateBarcodeToZipcode = require('./TranslateBarcodeToZipcode')
let CommandResponse = require('./CommandResponse');
class GotoBarcodeToZipcode {
    execute() {
        let text = `Please input bar code:`;
        let newMapping = {
            "*": new TranslateBarcodeToZipcode(this)
        };
        return new CommandResponse(text, false, false, newMapping);

    }
}

module.exports = GotoBarcodeToZipcode;