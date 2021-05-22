import express from 'express';
import {Server as HTTPServer} from 'http';

const defaultPort = 80;

class Server {
    private _app: express.Express;
    private _port: number;
    private  _server: HTTPServer;
    private static _instance: Server;

    constructor() {
        if (Server._instance) {
            throw new Error('Вы пытаетесь создать экземпляр Server, однако, Server является синглтоном.'
                + ' Используйте метод Server.getInstance()')
        } else {
            Server._instance = this;
        }
    }

    getInstance (): Server {
        return Server._instance;
    }

    start (port: number = 80): void {
        this._app = express();

        this._app.get('/', (rec, res) => {
            res.send('Hello, World!');
        });

        this._port = port;
        this._server = this._app.listen(port, () => {
            console.log(`Server listening at port: ${port}`);
        });
    }

    stop (): void {
        if (this._server) {

            const address = this._server.address();
            let port: number;
            if (address instanceof Object) {
                port = address.port;
            }
            console.log(`Сервер ${port ? 'на порту:' : ''} ${port ?? ''} будет остановлен`);
            this._server.close();
            this._server = undefined;
            console.log('Сервер остановлен');
        }
    }
}

export default new Server();
