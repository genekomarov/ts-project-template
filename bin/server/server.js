"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const defaultPort = 80;
class Server {
    constructor() {
        if (Server._instance) {
            throw new Error('Вы пытаетесь создать экземпляр Server, однако, Server является синглтоном.'
                + ' Используйте метод Server.getInstance()');
        }
        else {
            Server._instance = this;
        }
    }
    getInstance() {
        return Server._instance;
    }
    start(port = 80) {
        this._app = express_1.default();
        this._app.get('/', (rec, res) => {
            res.send('Hello, World!');
        });
        this._port = port;
        this._server = this._app.listen(port, () => {
            console.log(`Server listening at port: ${port}`);
        });
    }
    stop() {
        if (this._server) {
            const address = this._server.address();
            let port;
            if (address instanceof Object) {
                port = address.port;
            }
            console.log(`Сервер ${port ? 'на порту:' : ''} ${port !== null && port !== void 0 ? port : ''} будет остановлен`);
            this._server.close();
            this._server = undefined;
            console.log('Сервер остановлен');
        }
    }
}
exports.default = new Server();
