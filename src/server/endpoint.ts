import Server from './ServerApp';
import CommandListener, {ICommands} from './CommandListener'

enum commandNames {
    start = 'start',
    stop = 'stop',
    exit = 'exit'
}

const commands: ICommands = {};
commands[commandNames.start] = CommandListener.createCommandFunction(() => {
    return Server.start();
});
commands[commandNames.stop] = CommandListener.createCommandFunction(() => {
    return Server.stop();
});
commands[commandNames.exit] = CommandListener.createCommandFunction(() => {
    process.exit(0);
});

const commandListener = new CommandListener(commands);
