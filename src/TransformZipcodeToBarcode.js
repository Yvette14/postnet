let Translator = require('./zipcodeToBarcodeClass');

let GotoZipcodeToBarcode = require('./gotoZipcodeTranlatorClass');
class transformZipcodeToBarcodeClass {

    execute(input) {
        let translator = new Translator();
        let gotoZipcodeToBarcode = new GotoZipcodeToBarcode();
        let coreResponse = translator.execute(input);
        if (coreResponse.type) {
            return {
                text: "transformResult is " + coreResponse.barcodes/*需要改*/,
                next: false,
                reset: true,
                newMapping: false
            }
        } else {
            return {
                text: "Please give right input",
                next: gotoZipcodeToBarcode.execute,
                reset: false,
                newMapping: false
            }
        }
    }
}

module.exports = transformZipcodeToBarcodeClass;