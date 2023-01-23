import { Router, Response, Request } from "express";
import { ObjectId } from "mongoose";
import { Class } from "../schema/class.schema";
import { Families, IFamilies } from "../schema/families.schema";

interface IClass {
    name: string;
    state: boolean;
    familyId: string;
}

interface IUpdateClass {
    name: string;
    state: boolean;
    id: ObjectId;
}

export class ClassController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public createClass = async(req: Request, res: Response) => {
        try {
            const body: IClass = req.body;
            const {
                name,
                state,
                familyId
            } = body;

            Class.find({ name: name })
            .then(async (data) => {
                if(data.length !== 0) return res.status(400).json({
                    ok: false,
                    message: "La clase que desea guardar ya se encuentra registrado en el repositorio de datos."
                });

                const newClass = new Class({
                    name: name,
                    state: state
                });

                newClass.save(async (err, data) => {
                    if(err) return res.status(400).json({
                        ok: false,
                        message: "No hemos podido registrar la clase suministrada, por favor intentelo de nuevo mas tarde."
                    });

                    Families.findByIdAndUpdate(familyId, {
                        $push: {
                            classId: data._id
                        }
                    }).then(() => console.log('guardado'));

                    return res.status(201).json({
                        ok: true,
                        message: "Clase registrada correctamente."
                    });
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

    public updateClass = async(req: Request, res: Response) => {
        try {
            const body: IUpdateClass = req.body;
            const {
                name,
                state,
                id
            } = body;

            Class.findByIdAndUpdate(id, {
                name: name,
                state: state
            })
            .then((data) => {
                return res.status(200).json({
                    ok: true,
                    message: "Clase actualizada correctamente."
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
            Families
            .find()
            .populate('classId')
            .then((data) => {
                data.forEach(element => {
                    return res.status(200).json({
                        ok: true,
                        data: element.classId
                    });
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
        this.router.post('/create', this.createClass);
        this.router.put('/update', this.updateClass);
        this.router.get('/all', this.getAll);
    }
}