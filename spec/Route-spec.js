"use strict";
let Route = require('../src/Route');

describe('route class test', ()=> {
    it('main command', ()=> {
        let output = new Route().execute("main");
        let expected = `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`

        expect(output).toEqual(expected);
    })

    it('input 1', ()=> {
        let output = new Route().execute("1");
        let expected = `Please input zip code:`;
        expect(output).toEqual(expected);
    })

    it('input 1 and input right zipcode', ()=> {
        let route = new Route();
        route.execute("1");
        let output = route.execute("23333");
        let expected = `transformResult is |::|:|::||:::||:::||:::||::||::|`;
        expect(output).toEqual(expected);
    })

    it('input 1 but input wrong zipcode', ()=> {
        let route = new Route();
        route.execute("1");
        let output = route.execute("233333");
        let expected = "Please give right input\nPlease input zip code:";
        expect(output).toEqual(expected);
    })

    it('input 2', ()=> {
        let output = new Route().execute("2");
        let expected = `Please input bar code:`;
        expect(output).toEqual(expected);
    })

    it('input 2 and input right barcode', ()=> {
        let route = new Route();
        route.execute("2");
        let output = route.execute(`|::|:|::||:::||:::||:::||::||::|`);
        let expected = `transformResult is 23333`;
        expect(output).toEqual(expected);
    })

    it('input 2 but input wrong barcode', ()=> {
        let route = new Route();
        route.execute("2");
        let output = route.execute(`|::|:|::||:::||:::||:::||:|::|`);
        let expected = `Please give right input\nPlease input bar code:`;
        expect(output).toEqual(expected);
    })

    it('exit', ()=> {
        let output = new Route().execute("3");
        let expected = `Thank U!Good Bye!`;
        expect(output).toEqual(expected);
    })
})