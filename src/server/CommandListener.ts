interface ICommands {
    [name: string]: Function;
}

class CommandListener {
    private readonly _commands: ICommands;

    constructor(commands: ICommands) {
        this._commands = commands;
        process.stdout.write('command: ');
        process.stdin.on('data', this._stdinDataHandler);
    }

    private _stdinDataHandler(data: Buffer): void {
        process.stdin.removeListener('data', this._stdinDataHandler);
        const rawCommand = data.toString();
        const command = rawCommand.replace(/\W*/g, '');
        if (this._commands[command]) {
            this._commands[command]();
        } else {
            // TODO Выполняем действие по умолчанию
        }
    }
}