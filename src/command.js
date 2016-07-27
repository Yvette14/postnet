module.exports = {
    mainCommand,
    gotoZipcodeBarcodePage,
    gotoBarcodeZipcodePage,
    exit,
    transformZipcodeToBarcode,
    transformBarcodeToZipcode
}

let translate = require('./code');
//主菜单
function mainCommand() {
    return {
        text:`1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`
    };
}

//选择1
function gotoZipcodeBarcodePage() {
    return {
        text:`Please input zip code:`,
        newMapping:{
            "*":transformZipcodeToBarcode
        }
    };
}

//选择2
function gotoBarcodeZipcodePage() {
    return {
        text:`Please input bar code:`,
        newMapping:{
            "*":transformBarcodeToZipcode
        }
    };
}

//选择3
function exit() {
    return{
        text:"Thank U!Good Bye!"
    }
}



function transformZipcodeToBarcode(input) {
    let coreResponse = translate.printBarcodes(input);
    if(coreResponse.type){
        return{
            text:"transformResult is " + coreResponse.barcodes,
            reset:true
        }
    }else {
        return {
            text:"Please give right input",
            next:gotoZipcodeBarcodePage,
        }
    }
}

function transformBarcodeToZipcode(input) {
    let coreResponse = translate.printZipcodes(input);
    if(coreResponse.type){
        return{
            text:"transformResult is " + coreResponse.zipcodes,
            reset:true
        }
    }else {
        return{
            text:"Please give right input",
            next:gotoBarcodeZipcodePage,
        }
    }
}