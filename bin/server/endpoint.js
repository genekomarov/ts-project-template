"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
process.stdout.write('Hello, I am HTTP server\n');
const server = server_1.default.getInstance();
process.stdout.write('command: ');
process.stdin.on('data', stdinDataHandler);
function stdinDataHandler(data) {
    process.stdin.removeListener('data', stdinDataHandler);
    const rawCommand = data.toString();
    const command = rawCommand.replace(/\W*/g, '');
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
