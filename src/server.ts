import express from "express";
import { ApiKeyController } from "./controllers/apiKey.controller";
import { config } from 'dotenv';
import connection from "./database/db.connectios";
import logger from 'jet-logger';
import morgan from "morgan";
import cors from "cors";
import { AuthController } from "./controllers/auth.controller";
import { WareHousesController } from "./controllers/warehouses.controller";
import { PlacesController } from "./controllers/places.controller";
import { FamiliesController } from "./controllers/families.controller";
import { ClassController } from "./controllers/class.controller";
import { GroupsController } from "./controllers/groups.controller";
config();

class Server {
    private app: express.Application;
    private parameters: ApiKeyController;
    private auth: AuthController;
    private warehouse: WareHousesController;
    private places: PlacesController;
    private families: FamiliesController;
    private class: ClassController;
    private groups: GroupsController;

    constructor(

    ) {
        this.app = express();
        connection();
        this.configuration();
        this.parameters = new ApiKeyController();
        this.auth = new AuthController();
        this.warehouse = new WareHousesController();
        this.places = new PlacesController();
        this.families = new FamiliesController();
        this.class = new ClassController();
        this.groups = new GroupsController();
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
        this.app.use('/v1/api/auth', this.auth.router);
        this.app.use('/v1/api/warehouse', this.warehouse.router);
        this.app.use('/v1/api/places', this.places.router);
        this.app.use('/v1/api/families', this.families.router);
        this.app.use('/v1/api/class', this.class.router);
        this.app.use('/v1/api/groups', this.groups.router);
    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            logger.info(`Server is listening ${this.app.get('port')} port.`);
        })
    }
}

const server = new Server();
server.start();