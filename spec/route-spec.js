"use strict";
let {route, reset} = require('../src/route');

describe('route check', ()=> {
    beforeEach(() =>{
        reset();
    });

    it('main menu',()=>{
        let input = "main";
        let mainmenu = route(input);
        let expected = `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`

        expect(mainmenu).toEqual(expected);
    })

    it('input 1', ()=> {
        let input = '1';
        let choice = route(input);
        let expected = `Please input zip code:`;
        expect(choice).toEqual(expected);
    })
    it('enter 1,right',()=>{
        route("1");
        let input = "23333";
        let transform = route(input);
        let expected = `transformResult is |::|:|::||:::||:::||:::||::||::|`;
        expect(transform).toEqual(expected);
    })

    it('enter 1,wrong',()=>{
        route("1");
        let input = "233333";
        let transform = route(input);
        let expected = "Please give right input\nPlease input zip code:";
        expect(transform).toEqual(expected);
    })


    it('input 2', ()=> {
        let input = '2';
        let choice = route(input);
        let expected = `Please input bar code:`;

        expect(choice).toEqual(expected);
    })

    it('enter 2',()=>{
        route("2");
        let input = `|::|:|::||:::||:::||:::||::||::|`;
        let transform = route(input);
        let expected =`transformResult is 23333`;
        expect(transform).toEqual(expected);
    })

    it('enter 2,wrong',()=>{
        route("2");
        let input = `|:3:|:|::||:::||:::||:::||::||::|`;
        let transform = route(input);
        let expected =`Please give right input\nPlease input bar code:`;
        expect(transform).toEqual(expected);
    })

    it('input 3',()=>{
        let input = "3";
        let exitCommand = route(input);
        let expected = `Thank U!Good Bye!`;
        expect(exitCommand).toEqual(expected);
    })

    it('input wrong input', ()=> {
        let input = 'a';
        let choice = route(input);
        let expected = "no command\nPlease give right input";
        expect(choice).toEqual(expected);
    })
})