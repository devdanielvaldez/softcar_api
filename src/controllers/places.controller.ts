import { Router, Response, Request } from "express";
import { ObjectId } from "mongoose";
import { Places } from "../schema/places.schema";
import { Warehouses } from "../schema/warehouses.schema";

interface ICreatePlace {
    name: string;
    phone: string;
    state: boolean;
    warehouseId: ObjectId;
}

interface IUpdatePlace {
    name: string;
    phone: string;
    state: boolean;
    id: ObjectId;
}

export class PlacesController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public registerPlace = async(req: Request, res: Response) => {
        try {
            const body: ICreatePlace = req.body;
            const {
                name,
                phone,
                state,
                warehouseId
            } = body;

            Places.find({ name: name })
            .then((data) => {
                if(data.length !== 0) return res.status(400).json({
                    ok: false,
                    message: "El lugar que desea registrar ya se encuentra en su catalogo."
                });

                const newPlace = new Places({
                    name: name,
                    phone: phone,
                    state: state
                });

                newPlace.save((err, data) => {
                    if(err) return res.status(400).json({
                        ok: false,
                        message: "Se ha producido un error al intentar registrar el lugar, por favor intentelo mas tarde."
                    });

                    Warehouses.findByIdAndUpdate(warehouseId, {
                        $push: {
                            placesId: data._id
                        }
                    })
                    .then((data) => {
                        return res.status(200)
                        .json({
                            ok: true,
                            message: "Lugar guardado correctamente."
                        });
                    })
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

    public getAllPlaces = async(req: Request, res: Response) => {
        try {
            Warehouses
            .find()
            .populate('placesId')
            .then(async (data) => {
                data.forEach(element => {
                    return res.status(200).json({
                        ok: true,
                        data: element.placesId
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

    public updatePlaces = async(req: Request, res: Response) => {
        try {
            const body: IUpdatePlace = req.body;
            const {
                name,
                state,
                phone,
                id
            } = body;

            Places.findByIdAndUpdate(id, {
                name: name,
                state: state,
                phone: phone
            })
            .then((data) => {
                return res.status(200)
                .json({
                    ok: true,
                    message: "El lugar ha sido actualizado correctamente."
                });
            });
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
        this.router.post('/create', this.registerPlace);
        this.router.get('/all', this.getAllPlaces);
        this.router.put('/update', this.updatePlaces);
    }
}