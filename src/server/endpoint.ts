import Server from './server';

type commandType = 'start' | 'stop' | 'exit';

process.stdout.write('Hello, I am HTTP server\n');

const server = Server.getInstance();

process.stdout.write('command: ');
process.stdin.on('data', stdinDataHandler);

function stdinDataHandler(data: Buffer) {
    process.stdin.removeListener('data', stdinDataHandler);
    const rawCommand = data.toString();
    const command = rawCommand.replace(/\W*/g, '') as commandType;
    switch (command) {
        case 'start':
            server.start();
            break;
        case 'stop':
            server.stop();
            break;
        case 'exit':
            process.exit(0);
            break;
        default:
            console.log('Введена неправильная команда!');
            break;
    }
    Promise.resolve().then(() => {
        process.stdout.write('command: ');
        process.stdin.on('data', stdinDataHandler);
    });
}