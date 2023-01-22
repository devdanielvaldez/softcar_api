import { Router, Response, Request } from "express";
import { IWareHouses } from "../schema/warehouses.schema";
import { Warehouses } from "../schema/warehouses.schema";

interface IUpdateWarehouses {
    id: string;
    name: string;
    state: boolean;
}

export class WareHousesController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public registerWarehouse = async(req: Request, res: Response) => {
        try {
            const body: IWareHouses = req.body;
            const {
                name,
                state
            } = body;

            Warehouses.find({
                name: name
            })
            .then(async (data) => {
                console.log(data);
                if(data.length !== 0) return res.status(400).json({
                    ok: false,
                    message: "El almacen que desea registrar ya se encuentra en su catalogo"
                });

                const newWarehouses = new Warehouses({
                    name: name,
                    state: state
                });

                newWarehouses.save((err, data) => {
                    if(err) return res.status(400).json({
                        ok: false,
                        message: "Se ha presentado un error al registrar su almacen"
                    });

                    return res.status(201).json({
                        ok: true,
                        message: "Almacen registrado correctamente"
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

    public getWarehouses = async(req: Request, res: Response) => {
        try {
            Warehouses.find()
            .then((data) => {
                return res.status(200)
                .json({
                    ok: true,
                    data: data
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

    public updateWarehouses = async(req: Request, res: Response) => {
        try {
            const body: IUpdateWarehouses = req.body;
            const {
                name,
                state,
                id
            } = body;

            Warehouses
            .findByIdAndUpdate(id, {
                name: name,
                state: state
            })
            .then(async (data) => {
                return res.status(200)
                .json({
                    ok: true,
                    message: "Almacen actualizado correctamente"
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
        this.router.post('/create', this.registerWarehouse);
        this.router.get('/all', this.getWarehouses);
        this.router.put('/update', this.updateWarehouses);
    }
}