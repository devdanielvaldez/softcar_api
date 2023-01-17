import { Router, Response, Request } from "express";
import { generateApiKey } from 'generate-api-key';
import { HydratedDocument } from "mongoose";
import { ISystem, SystemConfiguration } from "../schema/System.schema";

export class ApiKeyController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public initSystem = async(req: Request, res: Response) => {
        try {
            const {
                api,
                dashboard,
                licenseNumber
            } = req.body;
            const apiKey = generateApiKey();

            const systemSchema: HydratedDocument<ISystem> = new SystemConfiguration({
                firstAccess: false,
                apiKey: apiKey,
                urlDashboard: dashboard,
                urlApi: api,
                licenseNumber: licenseNumber,
                licenseState: true
            });

            systemSchema.save((err: any, data: any) => {
                if(err) return res.status(400).json({
                    ok: false,
                    message: "Se ha producido un error al introducir datos en la base de datos.",
                    error: err
                });

                return res.status(201).json({
                    ok: true,
                    message: "Parametros registrados e iniciados correctamente.",
                    data: data
                });
            })
        } catch(err) {
            return res.status(500).json({
                ok: false,
                message: "Error al generar API KEY, por favor contacte al administrador del sistema."
            });
        }
    }

    public routes() {
        this.router.post('/init', this.initSystem);
    }
}