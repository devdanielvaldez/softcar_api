import { Router, Response, Request } from "express";
import { ObjectId } from "mongoose";
import { Class } from "../schema/class.schema";
import { Families, IFamilies } from "../schema/families.schema";
import { Groups } from "../schema/groups.schema";

interface IGroups {
    name: string;
    state: boolean;
    preBooking: number;
}

interface IGroupsUpdate {
    name: string;
    state: boolean;
    preBooking: number;
    id: ObjectId;
}

export class GroupsController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public createGroups = async(req: Request, res: Response) => {
        try {
            const body: IGroups = req.body;
            const {
                name,
                state,
                preBooking
            } = body;

            Groups.find({ name: name })
            .then(async (data) => {
                if(data.length !== 0) return res.status(400)
                .json({
                    ok: false,
                    message: "El grupo que desea registrar ya se encuentra ocupado"
                });

                const newGroup = new Groups({
                    name: name,
                    state: state,
                    preBooking: preBooking
                });

                newGroup.save(async (err, data) => {
                    if(err) return res.status(400)
                    .json({
                        ok: false,
                        message: "Se ha producido un erro en el registro de este grupo, por favor intentelo mas tarde."
                    });

                    return res.status(201)
                    .json({
                        ok: true,
                        message: "Grupo guardado correctamente"
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

    public updateGroups = async(req: Request, res: Response) => {
        try {
            const body:IGroupsUpdate = req.body;
            const {
                id,
                name,
                state,
                preBooking
            } = body;

            Groups.findByIdAndUpdate(id, {
                name: name,
                state: state,
                preBooking: preBooking
            })
            .then(async (data) => {
                return res.status(200)
                .json({
                    ok: true,
                    message: "Grupo actualizado correctamente"
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
            Groups.find()
            .then(async (data) => {
                return res.status(200)
                .json({
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
        this.router.post('/create', this.createGroups);
        this.router.put('/update', this.updateGroups);
        this.router.get('/all', this.getAll);
    }
}