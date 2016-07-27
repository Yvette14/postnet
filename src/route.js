let commands = require('./command');
let mapping = {
    "1":commands.gotoZipcodeBarcodePage,
    "2":commands.gotoBarcodeZipcodePage,
    "3":commands.exit,
    "main":commands.mainCommand
}

function route(input) {
    let response;
    let command = mapping[input];

    let result ="";

    if(command){
        response = command(input);
        result+=response.text;
    }else if(mapping["*"]){
        response = mapping["*"](input);
        result+=response.text;
    }else {
        return "no command\nPlease give right input";

    }



    if(response.reset){
        reset();
    }
    if(response.newMapping){
        mapping=response.newMapping;
    }

    if(response.next){
        let newResponse;
        do{
            newResponse = response.next();
            result+="\n";
            result+=newResponse.text;
        }while (newResponse.next);
    }
    return result;
}

let reset = function(){
    "use strict";
    mapping={
        "1":commands.gotoZipcodeBarcodePage,
        "2":commands.gotoBarcodeZipcodePage,
        "3":commands.exit,
        "main":commands.mainCommand
    }
}
module.exports = {
    route,
    reset
};
