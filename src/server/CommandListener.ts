type CommandFunctionType = () => Promise<unknown>;

export interface ICommands {
    [name: string]: CommandFunctionType;
}

export default class CommandListener {
    private readonly _commands: ICommands;

    constructor(commands: ICommands) {
        this._stdinDataHandler = this._stdinDataHandler.bind(this);
        this._commands = commands;
        process.stdout.write('command: ');
        process.stdin.on('data', this._stdinDataHandler);
    }

    static createCommandFunction(func: Function): CommandFunctionType {
        return function (): Promise<unknown> {
            return Promise.resolve(func());
        };
    }

    private _stdinDataHandler(data: Buffer): void {
        process.stdin.removeListener('data', this._stdinDataHandler);
        const rawCommand = data.toString();
        const command = rawCommand.replace(/\W*/g, '');
        let commandPromise: Promise<unknown>;
        if (this._commands[command]) {
            commandPromise = this._commands[command]();
        } else {
            commandPromise = new Promise<unknown>((resolve) => {
                if (command) {
                    process.stdout.write(`Неизвестная команда: ${command}`);
                }
                resolve(undefined);
            });
        }
        commandPromise.then(() => {
            process.stdout.write('command: ');
            process.stdin.on('data', this._stdinDataHandler);
        });
    }
}