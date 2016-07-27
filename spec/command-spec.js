"use strict";
let command = require('../src/command')

describe('command',()=>{
    it('main.command',()=>{
        let selectString = command.mainCommand();
        let expected = {
        text:`1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`
    };
        expect(selectString).toEqual(expected);
});
    it('go to zip to barcode page',()=>{
        let selectChoice = command.gotoZipcodeBarcodePage();
        let expected = {
            text:`Please input zip code:`,
            newMapping:{
                "*":command.transformZipcodeToBarcode
            }
        };
        expect(selectChoice).toEqual(expected);
    })

    it('go to barcode to zip page',()=>{
        let selectChoice = command.gotoBarcodeZipcodePage();
        let expected = {
            text:`Please input bar code:`,
            newMapping:{
                "*":command.transformBarcodeToZipcode
            }
        }

        expect(selectChoice).toEqual(expected);
    })


    it('transform zipcode',()=>{
        let input = '23333';
        let response = command.transformZipcodeToBarcode(input);
        let expected = {
            text:"transformResult is |::|:|::||:::||:::||:::||::||::|",
            reset:true
        };

        expect(response).toEqual(expected);

    })

    it('transform zipcode wrong',()=>{
        let input = '233333';
        let response = command.transformZipcodeToBarcode(input);
        let expected = {
            text:"Please give right input",
            next:command.gotoZipcodeBarcodePage
        };

        expect(response).toEqual(expected);
    })

    it('transform barcode',()=>{
        let input = `|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
        let response = command.transformBarcodeToZipcode(input);
        let expected ={
            text:"transformResult is 45056-1234" ,
            reset:true,
        }

        expect(response).toEqual(expected);
    })

    it('transform barcode wrong',()=>{
        let input = `|:|::|:|:|:||::::|:|::3:::::||::|:|::||::|::|||:::|`;
        let response = command.transformBarcodeToZipcode(input);
        let expected = {
            text:"Please give right input",
            next:command.gotoBarcodeZipcodePage
        }

        expect(response).toEqual(expected);
    })
})