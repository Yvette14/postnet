class translatorResponse{
    constructor(message,type){
        this.text = message;
        this.type = type;
    }

    get message(){
        return this.message;
    }

    set message(message){
        this.message = message;
    }
}

module.exports = translatorResponse;