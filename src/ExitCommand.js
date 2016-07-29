class ExitCommand {
    execute() {
        return {
            text: "Thank U!Good Bye!",
            next: false,
            reset: false,
            newMapping: false
        }
    }
}

module.exports = ExitCommand;