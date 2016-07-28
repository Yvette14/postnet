let Translator = require('./barcodeToZipcodeClass');
let GotoBarcodeToZipcode = require('./gotoBarcodeTranlatorClass');
class transformBarcodeToZipcodeClass {
    execute(input) {
        let translator = new Translator();
        let gotoBarcodeToZipcode = new GotoBarcodeToZipcode();
        let coreResponse = translator.execute(input);
        if (coreResponse.type) {
            return {
                text: "transformResult is " + coreResponse.zipcodes,
                next:false,
                reset: true,
                newMapping:false
            }
        } else {
            return {
                text: "Please give right input",
                next: gotoBarcodeZipcode.execute,
                reset:false,
                newMapping:false
            }
        }
    }
}

module.exports = transformBarcodeToZipcodeClass;