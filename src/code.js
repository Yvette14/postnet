module.exports = {
    printBarcodes,
    printZipcodes,
    validZipcodeFormat,
    dropHyphen,
    addCheckcode,
    barcodeTransform,
    validBarcodeFormat,
    dropLongLines,
    splitBarcodes,
    zipcodeTransform,
    checkoutCheckcode,
    zipcodeToBarcode,
    barcodeToZipcode
}

let _ = require('../lib/jasmine/lodash');
let allcode = require('./allcode')

function printBarcodes(zipcodes) {
    let zipcodesObj = validZipcodeFormat(zipcodes);
    let zipcodeWithoutHyphen = dropHyphen(zipcodesObj);
    let zipcodeWithCheckcode = addCheckcode(zipcodeWithoutHyphen);
    let allTransform = allcode();
    let barcodeString = barcodeTransform(zipcodeWithCheckcode, allTransform);
    return barcodeString;
}

function printZipcodes(barcodes) {
    let barcodesObj = validBarcodeFormat(barcodes);
    let barcodesWithoutLonglines = dropLongLines(barcodesObj);
    let barcodesArray = splitBarcodes(barcodesWithoutLonglines);
    let allTransforms = allcode();
    let zipcodeString = zipcodeTransform(barcodesArray,allTransforms);
    let zipcodeStrWithCheckcode = checkoutCheckcode(zipcodeString);
    return zipcodeStrWithCheckcode
}
function validZipcodeFormat(zipcodes) {
    let zipcodesArray = zipcodes.split("");
    let rightZipcodes = {
        zipcodes,
        type: true
    };
    let errorZipcodes={
        zipcodes,
        type:false
    }
    let len = zipcodes.length;
    switch (len) {
        case 5:
            let a = zipcodesArray.filter((zipcode) => typeof (zipcode - 0) === 'number');
            if (a.length === zipcodesArray.length) {
                return rightZipcodes;
            }
            return errorZipcodes;
            break;

        case 9:
            let c = zipcodesArray.filter((zipcode) => typeof (zipcode - 0) === 'number');
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
function dropHyphen({zipcodes, type}) {
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
function addCheckcode({zipcodes, type}) {
    if (type) {
        let codeSum = _.sum(zipcodes);
        let cd;
        if(10-codeSum % 10 !== 10){
            cd = 10-codeSum % 10;
        }else {
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
function barcodeTransform({zipcodes, type}, allTransforms) {
    if (type) {
        let a = zipcodes.map((singleCode) => {
            let hasCode = allTransforms.find(({zipcode,barcode}) => zipcode===singleCode);
            return hasCode.barcode;
        })

        a.push('|');
        a.unshift('|');
        return {
            barcodes: a.join(""),
            type: type
        };
    }
    return {
        barcodes:zipcodes,
        type:false
    };
}

function validBarcodeFormat(barcodes) {
    let len = barcodes.length;
    if (((len - 2) / 5 === 6 || (len - 2) / 5 === 10) && _.endsWith(barcodes, '|') && _.startsWith(barcodes, '|')) {
        return {
            barcodes: barcodes,
            type: true
        };
    }
    return {
        barcodes,
        type:false
    };
}
function dropLongLines({barcodes, type}) {
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
function splitBarcodes({barcodes, type}) {
    if(type){
        let barcodesArr=[];
        for(let i=0;i<barcodes.length/5;i++){
            barcodesArr.push(barcodes.substr(i*5,5));
        }
        return {
            barcodes:barcodesArr,
            type
        }
    }
    return {
        barcodes,
        type
    };
}
function zipcodeTransform({barcodes, type},allTransforms) {
    if(type){
        let a = barcodes.map((singleCode)=>{
            let hasbarcode = allTransforms.find(({zipcode,barcode})=> barcode===singleCode);
            if(hasbarcode!==undefined){
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
function checkoutCheckcode({zipcodes,type}) {
    if(type){
        let sum = _.sum(zipcodes);
        if(sum%10 === 0){
            if(zipcodes.length>6){
                zipcodes.splice(5,0,'-');
            }
            zipcodes.pop();
            return{
                zipcodes:zipcodes.join(""),
                type
            }
        }
    }
    return {
        zipcodes,
        type
    };
}

function zipcodeToBarcode(zipcodesObj) {
    let zipcodeWithoutHyphen = dropHyphen(zipcodesObj);
    let zipcodeWithCheckcode = addCheckcode(zipcodeWithoutHyphen);
    let allTransform = allcode();
    let barcodeString = barcodeTransform(zipcodeWithCheckcode, allTransform);
    return barcodeString;
}

function barcodeToZipcode(barcodesObj) {
    let barcodesWithoutLonglines = dropLongLines(barcodesObj);
    let barcodesArray = splitBarcodes(barcodesWithoutLonglines);
    let allTransforms = allcode();
    let zipcodeString = zipcodeTransform(barcodesArray,allTransforms);
    let zipcodeStrWithCheckcode = checkoutCheckcode(zipcodeString);
    return zipcodeStrWithCheckcode;
}
