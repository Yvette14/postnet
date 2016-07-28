let TransformZipcodeToBarcode = require('./TransformZipcodeToBarcode');
let CommandResponse = require('./CommandResponse');

class gotoZipcodeTranlatorClass {
    execute() {
        let transformZipcodeToBarcode = new TransformZipcodeToBarcode();
        let text = `Please input zip code:`;
        let newMapping = {
            "*": transformZipcodeToBarcode.execute
        }
        return new CommandResponse(text, false, false, newMapping);
    }

}
module.exports=gotoZipcodeTranlatorClass;

