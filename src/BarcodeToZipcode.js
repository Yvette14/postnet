let _ = require('lodash');
let allcode = require('./allcode');
let TranslatorResponse = require('./TranslatorResponse');
class BarcodeToZipcode {
    execute(input) {
        return this.printZipcodes(input)
    }

    printZipcodes(barcodes) {
        let barcodesObj = this.validBarcodeFormat(barcodes);
        let barcodesWithoutLonglines = this.dropLongLines(barcodesObj);
        let barcodesArray = this.splitBarcodes(barcodesWithoutLonglines);
        let allTransforms = allcode();
        let zipcodeString = this.zipcodeTransform(barcodesArray, allTransforms);
        let {text, type} = this.checkoutCheckcode(zipcodeString);
        return new TranslatorResponse(text,type);
    }

    validBarcodeFormat(barcodes) {
        let len = barcodes.length;
        if (((len - 2) / 5 === 6 || (len - 2) / 5 === 10) && _.endsWith(barcodes, '|') && _.startsWith(barcodes, '|')) {
            return {
                barcodes: barcodes,
                type: true
            };
        }
        return {
            barcodes,
            type: false
        };
    }

    dropLongLines({barcodes, type}) {
        if (type) {
            let barcodesStr = barcodes.substring(1, barcodes.length - 1);
            return {
                barcodes: barcodesStr,
                type
            }
        }
        return {
            barcodes,
            type
        };
    }

    splitBarcodes({barcodes, type}) {
        if (type) {
            let barcodesArr = [];
            for (let i = 0; i < barcodes.length / 5; i++) {
                barcodesArr.push(barcodes.substr(i * 5, 5));
            }
            return {
                barcodes: barcodesArr,
                type
            }
        }
        return {
            barcodes,
            type
        };
    }

    zipcodeTransform({barcodes, type}, allTransforms) {
        if (type) {
            let a = barcodes.map((singleCode)=> {
                let hasbarcode = allTransforms.find(({zipcode, barcode})=> barcode === singleCode);
                if (hasbarcode !== undefined) {
                    return hasbarcode.zipcode;
                }
            })
            return {
                zipcodes: a,
                type: type
            };
        }
        return {
            barcodes,
            type
        };
    }

    checkoutCheckcode({zipcodes, type}) {
        if (type) {
            let sum = _.sum(zipcodes);
            if (sum % 10 === 0) {
                if (zipcodes.length > 6) {
                    zipcodes.splice(5, 0, '-');
                }
                zipcodes.pop();
                return {
                    text: zipcodes.join(""),
                    type
                }
            }
        }
        return {
            text: zipcodes,
            type
        };
    }

}

module.exports = BarcodeToZipcode;