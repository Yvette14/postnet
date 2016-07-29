"use strict";
let MainCommand = require('../src/MainCommand');
let GotoZipcodeToBarcode = require('../src/GotoZipcodeToBarcode');
let TranslateZipcodeToBarcode = require('../src/TranslateZipcodeToBarcode');

let GotoBarcodeToZipcode = require('../src/GotoBarcodeToZipcode');
let TranslateBarcodeToZipcode = require('../src/TranslateBarcodeToZipcode');

describe('commands class test', ()=> {
    it('#1 main command', ()=> {
        let expected = {
            text: `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`,
            next: false,
            reset: false,
            newMapping: false
        };

        expect(new MainCommand().execute()).toEqual(expected);
    })

    it('#2 command 1', ()=> {
        let next = new GotoZipcodeToBarcode();
        let expected = {
            text: `Please input zip code:`,
            next: false,
            reset: false,
            newMapping: {
                "*": new TranslateZipcodeToBarcode(next)
            }
        }
        expect(new GotoZipcodeToBarcode().execute()).toEqual(expected);
    })

    it('#2-1 input right zipcode', ()=> {
        let input = '45056-1234';
        let output = new TranslateZipcodeToBarcode().execute(input);
        let expected = {
            text: "transformResult is |:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|",
            next: false,
            reset: true,
            newMapping: false
        }

        expect(output).toEqual(expected);
    })

    it('#2-2 input wrong zipcode', ()=> {
        let input = '23144-44';
        let output = new TranslateZipcodeToBarcode(new GotoZipcodeToBarcode()).execute(input);
        let expected = {
            text: "Please give right input",
            next: new GotoZipcodeToBarcode(),
            reset: false,
            newMapping: false
        }

        expect(output).toEqual(expected);
    })

    it('#3 command 2', ()=> {
        let next = new GotoBarcodeToZipcode();
        let expected = {
            text: `Please input bar code:`,
            next: false,
            reset: false,
            newMapping: {
                "*": new TranslateBarcodeToZipcode(next)
            }
        }

        expect(new GotoBarcodeToZipcode().execute()).toEqual(expected);
    })

    it('#3-1 input right barcode', ()=> {
        let input = `|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
        let output = new TranslateBarcodeToZipcode().execute(input);
        let expected = {
            text: "transformResult is 45056-1234",
            next: false,
            reset: true,
            newMapping: false
        }

        expect(output).toEqual(expected);
    })

    it('#3-2 input wrong barcode', ()=> {
        let input = `|:|::|:|:||::::||::||:::::||::|:|::||::|::|||:::|`;
        let ouput = new TranslateBarcodeToZipcode(new GotoBarcodeToZipcode()).execute(input);

        let expected = {
            text: "Please give right input",
            next: new GotoBarcodeToZipcode(),
            reset: false,
            newMapping: false
        }

        expect(ouput).toEqual(expected);
    })
})