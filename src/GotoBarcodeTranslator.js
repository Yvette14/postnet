let TransformBarcodeToZipcode =
class gotoBarcodeTranlatorClass {
    execute() {
        return {
            text: `Please input bar code:`,
            next:false,
            reset:false,
            newMapping: {
                "*": transformBarcodeToZipcode
            }
        };
    }
}

module.exports = gotoBarcodeTranlatorClass;