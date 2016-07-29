let TranslateZipcodeToBarcode = require('./TranslateZipcodeToBarcode')

class GotoZipcodeToBarcode {
    execute() {
        let self = this;
        return {
            text: `Please input zip code:`,
            next: false,
            reset: false,
            newMapping: {
                "*": new TranslateZipcodeToBarcode(self)
            }
        };
    }
}

module.exports = GotoZipcodeToBarcode;