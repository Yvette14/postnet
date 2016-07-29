class CommandResponse {
    constructor(text, next = false, reset = false, newMapping = false) {
        this._text = text;
        this._next = next;
        this._reset = reset;
        this._newMapping = newMapping;
    }
}

module.exports = CommandResponse;