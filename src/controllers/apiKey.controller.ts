import { Router, Response, Request } from "express";
import { generateApiKey } from 'generate-api-key';

export class ApiKeyController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public generateApiKey = async(req: Request, res: Response) => {
        try {
            const apiKey = generateApiKey();

            return res.status(201).json({
                ok: true,
                apiKey: apiKey
            });
        } catch(err) {
            return res.status(500).json({
                ok: false,
                message: "Error al generar API KEY, por favor contacte al administrador del sistema."
            });
        }
    }

    public routes() {
        this.router.get('/generate', this.generateApiKey);
    }
}