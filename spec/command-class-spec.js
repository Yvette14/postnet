"use strict";
let MainCommand = require('../src/MainCommand');
let GotoZipcodeToBarcode = require('../src/GotoZipcodeToBarcode');
let TranslateZipcodeToBarcode = require('../src/TranslateZipcodeToBarcode');

let GotoBarcodeToZipcode = require('../src/GotoBarcodeToZipcode');
let TranslateBarcodeToZipcode = require('../src/TranslateBarcodeToZipcode');

let CommandResponse = require('../src/CommandResponse');

describe('commands class test', ()=> {
    it('#1 main command', ()=> {
        let text = `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`;
        let expected = new CommandResponse(text, false, false, false);

        expect(new MainCommand().execute()).toEqual(expected);
    })

    it('#2 command 1', ()=> {
        let next = new GotoZipcodeToBarcode();
        let text = `Please input zip code:`;
        let newMapping = {
            "*": new TranslateZipcodeToBarcode(next)
        };
        let expected = new CommandResponse(text, false, false, newMapping);
        expect(new GotoZipcodeToBarcode().execute()).toEqual(expected);
    })

    it('#2-1 input right zipcode', ()=> {
        let input = '45056-1234';
        let output = new TranslateZipcodeToBarcode().execute(input);
        let text = "transformResult is |:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|";
        let expected = new CommandResponse(text, false, true, false);

        expect(output).toEqual(expected);
    })

    it('#2-2 input wrong zipcode', ()=> {
        let input = '23144-44';
        let output = new TranslateZipcodeToBarcode(new GotoZipcodeToBarcode()).execute(input);
        let text = "Please give right input";
        let next = new GotoZipcodeToBarcode();
        let expected = new CommandResponse(text, next, false, false);

        expect(output).toEqual(expected);
    })

    it('#3 command 2', ()=> {
        let next = new GotoBarcodeToZipcode();
        let text = `Please input bar code:`;
        let newMapping = {
            "*": new TranslateBarcodeToZipcode(next)
        };
        let expected = new CommandResponse(text, false, false, newMapping);

        expect(new GotoBarcodeToZipcode().execute()).toEqual(expected);
    })

    it('#3-1 input right barcode', ()=> {
        let input = `|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
        let output = new TranslateBarcodeToZipcode().execute(input);
        let text = "transformResult is 45056-1234";
        let expected = new CommandResponse(text, false, true, false);

        expect(output).toEqual(expected);
    })

    it('#3-2 input wrong barcode', ()=> {
        let input = `|:|::|:|:||::::||::||:::::||::|:|::||::|::|||:::|`;
        let ouput = new TranslateBarcodeToZipcode(new GotoBarcodeToZipcode()).execute(input);
        let text = "Please give right input";
        let next = new GotoBarcodeToZipcode();
        let expected = new CommandResponse(text, next, false, false);

        expect(ouput).toEqual(expected);
    })
})