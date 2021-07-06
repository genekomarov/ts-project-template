import {Server as HTTPServer} from 'http';
import express from 'express';

export default class ServerHTTP {
    private readonly _server: HTTPServer;
    private readonly _port: number;

    constructor(appExpress: express.Express, port?: number) {
        this._server = appExpress.listen(port, () => {
            console.log(`Server listening at port: ${port}`);
        });
        this._port = port;
    }

    getServer(): HTTPServer {
        return this._server;
    }

    getPort(): number {
        const address = this._server.address();
        let port: number;
        if (address instanceof Object) {
            port = address.port;
        } else {
            port = this._port;
        }
        return port;
    }

    destroy() {
        this._server.close();
    }
}