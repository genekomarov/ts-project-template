import express from 'express';
import ServerHTTP from './ServerHTTP';
import colors from 'colors/safe';

const defaultPort = 80;

/**
 * Простой сервер на базе Express
 * Синглтон
 */
class ServerApp {
    /** Приложение Express*/
    private readonly _app: express.Express;
    /** Инстанс сервера, который запущен в данный момент*/
    private _server: ServerHTTP = null;
    /** Инстанс данного класса*/
    private static _instance: ServerApp;

    /**
     *  Конструктор.
     *  Используется только в модуле сервера.
     *  Если попытаться вызвать контруктор более одного раза, будет выброшена ошибка.
     */
    constructor() {
        if (ServerApp._instance) {
            throw new Error('Вы пытаетесь создать экземпляр ServerApp, однако, ServerApp является синглтоном.'
                + ' Используйте метод ServerApp.getInstance()');
        } else {
            ServerApp._instance = this;
            this._app = express();
            this._app.get('/', (rec, res) => {
                res.send('Hello, World!');
            });
            console.log('Приложение Express создано.');
        }
    }

    /**
     * Получение экземпляра сервера
     */
    getInstance (): ServerApp {
        return ServerApp._instance;
    }

    /**
     * Запускает сервер
     * Сервер запускается на указаном порту или на порту по умолчанию
     */
    start (port: number = defaultPort): void {
        if (this._server) {
            const port = this._server.getPort();
            console.warn(colors.yellow(`Сервер уже запущен на порту ${port}. Сперва нужно остаовить сервер!`));
            return;
        }
        this._server = new ServerHTTP(this._app, port);
    }

    /**
     * Останавивает сервер
     */
    stop (): void {
        if (this._server) {
            const port = this._server.getPort();
            console.log(`Сервер ${port ? 'на порту:' : ''} ${port ?? ''} будет остановлен`);
            this._serverDestroy();
        } else {
            console.warn(colors.yellow('В данный момент сервер не запущен.'));
        }
    }

    /**
     * Останавливает сервер и удаляет ссылку на экземпляр
     */
    private _serverDestroy() {
        this._server.destroy();
        this._server = null;
        console.log('Сервер остановлен');
    }
}

export default new ServerApp();
