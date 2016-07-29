class MainCommand {
    execute() {
        return {
            text: `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`,
            next: false,
            reset: false,
            newMapping: false
        };
    }
}

module.exports = MainCommand;