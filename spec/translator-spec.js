"use strict";
let ZipcodeToBarcode = require('../src/ZipcodeToBarcode');
let BarcodeToZipcode = require('../src/BarcodeToZipcode');
let allcode = require('../src/allcode');

describe('translator', ()=> {
    it('print barcode', ()=> {
        let zipcodes = '45056-1234';
        let zipcodeString = new ZipcodeToBarcode().execute(zipcodes);
        let expected = {
            text: `|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`,
            type: true
        };
        expect(zipcodeString).toEqual(expected);
    })

    it('print zipcode', ()=> {
        let barcodes = `|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
        let zipcodeString = new BarcodeToZipcode().execute(barcodes);

        let expected = {
            text: '45056-1234',
            type: true
        };
        expect(zipcodeString).toEqual(expected);
    })
})