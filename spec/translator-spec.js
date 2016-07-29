"use strict";
let ZipcodeToBarcode = require('../src/ZipcodeToBarcode');
let BarcodeToZipcode = require('../src/BarcodeToZipcode');
let allcode = require('../src/allcode');
let TranslatorResponse = require('../src/TranslatorResponse');

describe('translator', ()=> {
    it('print barcode', ()=> {
        let zipcodes = '45056-1234';
        let zipcodeString = new ZipcodeToBarcode().execute(zipcodes);
        let text = `|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
        let expected = new TranslatorResponse(text,true);
        expect(zipcodeString).toEqual(expected);
    })

    it('print zipcode', ()=> {
        let barcodes = `|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
        let zipcodeString = new BarcodeToZipcode().execute(barcodes);

        let expected = new TranslatorResponse('45056-1234',true);
        expect(zipcodeString).toEqual(expected);
    })
})