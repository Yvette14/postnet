let TranslateZipcodeToBarcode = require('./TranslateZipcodeToBarcode')
let CommandResponse = require('./CommandResponse');
class GotoZipcodeToBarcode {
    execute() {
        let text = `Please input zip code:`;
        let newMapping = {
            "*": new TranslateZipcodeToBarcode(this)
        }
        return new CommandResponse(text, false, false, newMapping);

    }
}

module.exports = GotoZipcodeToBarcode;