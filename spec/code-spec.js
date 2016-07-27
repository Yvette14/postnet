'use strict'

let code = require('../src/code');
let allcode = require('../src/allcode');
describe('zipcode transform to barcode', function () {
    it('should valid the right input zipcode of 10', ()=> {
        let zipcodes = '45056-1234';
        let zipcodeObj = code.validZipcodeFormat(zipcodes);

        let expected = {
            zipcodes: '45056-1234',
            type: true
        };

        expect(zipcodeObj).toEqual(expected);
    })

    it('should valid the true zipcode of 5', ()=> {
        let zipcodes = '25443';
        let zipcodeObj = code.validZipcodeFormat(zipcodes);

        let expected = {
            zipcodes: '25443',
            type: true
        };

        expect(zipcodeObj).toEqual(expected);
    })

    it('should valid the true zipcode of 9', ()=> {
        let zipcodes = '254434333';
        let zipcodeObj = code.validZipcodeFormat(zipcodes);

        let expected = {
            zipcodes: '254434333',
            type: true
        };

        expect(zipcodeObj).toEqual(expected);
    })

    it('should valid the wrong zipcode', ()=> {
        let zipcodes = '254435';
        let zipcodeObj = code.validZipcodeFormat(zipcodes);

        let expected = {
            zipcodes:'254435',
            type:false
        }

        expect(zipcodeObj).toEqual(expected);
    })

    it('should drop the hyphen', ()=> {
        let zipcodeObj = {
            zipcodes: '45056-1234',
            type: true
        };

        let zipcodeWithoutHyphen = code.dropHyphen(zipcodeObj);

        let expected = {
            zipcodes: [4, 5, 0, 5, 6, 1, 2, 3, 4],
            type: true
        };
        expect(zipcodeWithoutHyphen).toEqual(expected);
    })

    it('should add the checkcode', ()=> {
        let zipcodeWithoutHyphen = {
            zipcodes: [4, 5, 0, 5, 6, 1, 2, 3, 4],
            type: true
        };
        let zipcodeWithCheckcode = code.addCheckcode(zipcodeWithoutHyphen);
        let expected = {
            zipcodes: [4, 5, 0, 5, 6, 1, 2, 3, 4, 0],
            type: true
        };

        expect(zipcodeWithCheckcode).toEqual(expected);
    })

    it('should transform to barcode', ()=> {
        let zipcodeWithCheckcode = {
            zipcodes:[4, 5, 0, 5, 6, 1, 2, 3, 4, 0],
            type:true
        };
        let barcodeAfterTrans = code.barcodeTransform(zipcodeWithCheckcode, allcode());

        let expected = {
            barcodes: '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|',
            type: true
        };

        expect(barcodeAfterTrans).toEqual(expected);
    })

    it('transform', ()=> {
        let zipcodes = '45056-1234';
        let zipcodeString = code.printBarcodes(zipcodes);
        let expected = {
            barcodes:`|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`,
            type:true
        };
        expect(zipcodeString).toEqual(expected);
    })

    it('input the right barcodes',()=>{
        let barcodes =  `|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
        let barcodeObj = code.validBarcodeFormat(barcodes);

        let expected = {
            barcodes:`|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`,
            type:true
        }

        expect(barcodeObj).toEqual(expected);
    })

    it('input the wrong barcodes',()=>{
        let barcodes =  `|:|::|:|:|:||::::|:|::||::::||::|:|::||::|::|||:::|`;
        let barcodeObj = code.validBarcodeFormat(barcodes);

        let expected = {
            barcodes:`|:|::|:|:|:||::::|:|::||::::||::|:|::||::|::|||:::|`,
            type:false
        };
        expect(barcodeObj).toEqual(expected);

    })

    it('drop long lines',()=>{
        let barcodeObj = {
            barcodes:`|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`,
            type:true
        }
        let barcodesWithoutLonglines = code.dropLongLines(barcodeObj);

        let expected = {
            barcodes:`:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::`,
            type:true
        }

        expect(barcodesWithoutLonglines).toEqual(expected);
    })

    it('split barcodes',()=>{
        let barcodeObj = {
            barcodes:`:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::`,
            type:true
        }

        let barcodesArray = code.splitBarcodes(barcodeObj);
        let expected = {
            barcodes:[':|::|',':|:|:','||:::',':|:|:',':||::',':::||','::|:|','::||:',':|::|','||:::'],
            type:true
        }

        expect(barcodesArray).toEqual(expected);
    })

    it('transform to zipcode',()=>{
        let splitedBarcodes ={
            barcodes:[':|::|',':|:|:','||:::',':|:|:',':||::',':::||','::|:|','::||:',':|::|','||:::'],
            type:true
        };
        // let allTransforms=loadAllTransforms();
        let zipcodeArr=code.zipcodeTransform(splitedBarcodes,allcode());

        let expected = {
            zipcodes:[4,5,0,5,6,1,2,3,4,0],
            type:true
        }

        expect(zipcodeArr).toEqual(expected);
    })

    it('checkout and add',()=>{
        let zipcodeArr={
            zipcodes:[4,5,0,5,6,1,2,3,4,0],
            type:true
        };

        let zipcodesWithHyphen = code.checkoutCheckcode(zipcodeArr);
        let expected = {
            zipcodes:'45056-1234',
            type:true
        }

        expect(zipcodesWithHyphen).toEqual(expected);
    })

    it('print zipcodes',()=>{
        let barcodes = `|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
        let zipcodeString = code.printZipcodes(barcodes);

        let expected = {
            zipcodes:'45056-1234',
            type:true
        };
        expect(zipcodeString).toEqual(expected);
    })

    it('zipcode to barcode',()=>{
        let zipcodesObj = {
            zipcodes: '45056-1234',
            type: true
        };

        let barcodeString = code.zipcodeToBarcode(zipcodesObj);
        let expected = {
            barcodes:'|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|',
            type:true
        };
        expect(barcodeString).toEqual(expected);
    })

    it('barcode to zipcode',()=>{
        let barcodesObj=
        {
            barcodes:`|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`,
            type:true
        };

        let zipcodeStrWithCheckcode=code.barcodeToZipcode(barcodesObj);
        let expected = {
            zipcodes:'45056-1234',
            type:true
        };

        expect(zipcodeStrWithCheckcode).toEqual(expected);

    })
});
