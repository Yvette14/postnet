let _ = require('lodash');
let allcode = require('./allcode');
let TranslatorResponse = require('./TranslatorResponse')
class ZipcodeToBarcode {
    execute(input) {
        return this.printBarcodes(input);
    }

    printBarcodes(zipcodes) {
        let zipcodesObj = this.validZipcodeFormat(zipcodes);
        let zipcodeWithoutHyphen = this.dropHyphen(zipcodesObj);
        let zipcodeWithCheckcode = this.addCheckcode(zipcodeWithoutHyphen);
        let allTransform = allcode();
        let {text,type} = this.barcodeTransform(zipcodeWithCheckcode, allTransform);
        return new TranslatorResponse(text,type);
    }

    validZipcodeFormat(zipcodes) {
        let zipcodesArray = zipcodes.split("");
        let rightZipcodes = {
            zipcodes,
            type: true
        };
        let errorZipcodes = {
            zipcodes,
            type: false
        };
        let len = zipcodes.length;
        switch (len) {
            case 5:
                let a = zipcodesArray.filter((zipcode) => isNaN(zipcode - 0) === false);

                if (a.length === zipcodesArray.length) {
                    return rightZipcodes;
                }
                return errorZipcodes;
                break;

            case 9:
                let c = zipcodesArray.filter((zipcode) => isNaN(zipcode - 0) === false);
                if (c.length === zipcodesArray.length) {
                    return rightZipcodes;
                }
                return errorZipcodes;
                break;
            case 10:
                if (zipcodes.indexOf('-') === 5 && zipcodes.lastIndexOf('-') === 5) {
                    let b = zipcodesArray.filter((zipcode) => isNaN(zipcode - 0) === false);
                    if (b.length === 9) {
                        return rightZipcodes;
                    }
                    return errorZipcodes;
                }
                return errorZipcodes;
                break;
            default:
                return errorZipcodes;
        }
    }

    dropHyphen({zipcodes, type}) {
        if (type) {
            let zipcodesStringArr = zipcodes.split("").filter((zipcode) => isNaN(zipcode - 0) === false);
            return {
                zipcodes: zipcodesStringArr.map((num) => {
                    return parseInt(num);
                }),
                type: type
            }
        }
        return {
            zipcodes,
            type
        };

    }

    addCheckcode({zipcodes, type}) {
        if (type) {
            let codeSum = _.sum(zipcodes);
            let cd;
            if (10 - codeSum % 10 !== 10) {
                cd = 10 - codeSum % 10;
            } else {
                cd = 0;
            }
            zipcodes.push(cd);
            return {
                zipcodes: zipcodes,
                type: type
            };
        }
        return {
            zipcodes,
            type
        };

    }

    barcodeTransform({zipcodes, type}, allTransforms) {
        if (type) {
            let a = zipcodes.map((singleCode) => {
                let hasCode = allTransforms.find(({zipcode, barcode}) => zipcode === singleCode);
                return hasCode.barcode;
            });

            a.push('|');
            a.unshift('|');
            return {
                text: a.join(""),
                type: type
            };
        }
        return {
            text: zipcodes,
            type: false
        };
    }
}

module.exports = ZipcodeToBarcode;