import express from "express";
import { ApiKeyController } from "./controllers/apiKey.controller";
import { config } from 'dotenv';
import connection from "./database/db.connectios";
import logger from 'jet-logger';
import morgan from "morgan";
import cors from "cors";
import { AuthController } from "./controllers/auth.controller";
config();

class Server {
    private app: express.Application;
    private parameters: ApiKeyController;
    private auth: AuthController;

    constructor(

    ) {
        this.app = express();
        connection();
        this.configuration();
        this.parameters = new ApiKeyController();
        this.auth = new AuthController();
        this.routes();
    }

    public configuration() {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json({ limit: '500mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '500mb' }));
        this.app.set('port', process.env.PORT || 5000);
    }

    public routes() {
        this.app.use('/v1/api/parameters', this.parameters.router);
        this.app.use('/v1/api/auth', this.auth.registerAdminUser);
    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            logger.info(`Server is listening ${this.app.get('port')} port.`);
        })
    }
}

const server = new Server();
server.start();