import { Router, Response, Request } from "express";
import { ObjectId } from "mongoose";
import { Families, IFamilies } from "../schema/families.schema";

interface IFamilyUpdate {
    name: string;
    state: boolean;
    id: string;
}

export class FamiliesController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public createFamilies = async(req: Request, res: Response) => {
        try {
            const body: IFamilies = req.body;
            const {
                name,
                state
            } = body;

            Families.find({ name: name })
            .then(async (data) => {
                if(data.length !== 0) return res.status(400).json({
                    ok: false,
                    message: "La familia que desea registrar ya se encuentra en su catelogo."
                });

                const newFamily = new Families({
                    name: name,
                    state: state
                });

                newFamily.save((err, data) => {
                    if(err) return res.status(500).json({
                        ok: false,
                        message: "Se ha producido un error al registrar esta familia."
                    });

                    return res.status(201).json({
                        ok: true,
                        message: "Familia guardada correctamente"
                    });
                })
            })
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                message: "Error inesperado, por favor contacte al administrador del sistema.",
                error: err
            }); 
        }
    }

    public updateFamily = async(req: Request, res: Response) => {
        try {
            const body: IFamilyUpdate = req.body;
            const {
                name,
                state,
                id
            } = body;

            Families.findByIdAndUpdate(id, {
                name: name,
                state: state
            })
            .then((data) => {
                return res.status(200)
                .json({
                    ok: true,
                    message: "Familia actualizada corractamente"
                });
            })
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                message: "Error inesperado, por favor contacte al administrador del sistema.",
                error: err
            }); 
        }
    }

    public getAll = async(req: Request, res: Response) => {
        try {
            Families.find()
            .then((data) => {
                return res.status(200).json({
                    ok: true,
                    data: data
                });
            })
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                message: "Error inesperado, por favor contacte al administrador del sistema.",
                error: err
            }); 
        }
    }

    public routes() {
        this.router.post('/create', this.createFamilies);
        this.router.put('/update', this.updateFamily);
        this.router.get('/all', this.getAll);
    }
}