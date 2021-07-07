import Server from './ServerApp';
import CommandListener, {ICommands} from './CommandListener'

const server = Server.getInstance();

enum commandNames {
    start = 'start',
    stop = 'stop',
    exit = 'exit'
}

const commands: ICommands = {};
commands[commandNames.start] = CommandListener.createCommandFunction(() => {
    return server.start();
});
commands[commandNames.stop] = CommandListener.createCommandFunction(() => {
    return server.stop();
});
commands[commandNames.exit] = CommandListener.createCommandFunction(() => {
    process.exit(0);
});

const commandListener = new CommandListener(commands);
