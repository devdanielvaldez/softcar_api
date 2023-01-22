import { Router, Request, Response } from "express";
import { Credentials } from "../schema/credentials.schema";
import { Profile } from "../schema/profile.schema";
import { generate } from 'generate-password';

interface IRegisterAdmin {
    user: string;
    name: string;
    phone: string;
    email: string;
}

export class AuthController {
    public router: Router

    constructor() {
        this.router = Router();
        this.routes();
    }

    public registerAdminUser = async(req: Request, res: Response) => {
        try {
            const body: IRegisterAdmin = req.body;
            const {
                user,
                name,
                phone,
                email
            } = body;

            const existUser: any = Credentials.findOne({ user: user.toLowerCase() }).exec();

            if(existUser !== null || existUser.length !== 0) return res.status(400).json({
                ok: false,
                message: "El usuario que desea registrar ya se encuentra en uso dentro del sistema."
            });

            const existEmail: any = Profile.findOne({ email: email.toLowerCase() }).exec();

            if(existEmail !== null || existEmail.length !== 0) return res.status(400).json({
                ok: false,
                message: "El email que desea registrar ya se encuentra en uso dentro del sistema."
            });

            const ramdonPass = await generate({
                length: 4,
                numbers: true,
                uppercase: true,
                lowercase: true,
                symbols: true
            });

            const newProfile = new Profile({
                name: name,
                email: email.toLowerCase(),
                phone: phone
            });

            newProfile.save((err, profile) => {
                if(err) return res.status(400).json({
                    ok: false,
                    message: "El usuario que desea registrar en estos momentos no se ha podido procesar, por favor intente mas tarde."
                });

                const newCredentials = new Credentials({
                    user: user,
                    password: ramdonPass,
                    rol: 'admin',
                    profileId: profile._id
                });

                newCredentials.save((error, credentials) => {
                    if(error) return res.status(400).json({
                        ok: false,
                        message: "El usuario que desea registrar en estos momentos no se ha podido procesar, por favor intente mas tarde."
                    });

                    return res.status(201).json({
                        ok: true,
                        message: "Usuario administrador creado correctamente",
                        data: credentials,
                        pass: ramdonPass
                    });
                })
            });
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                message: "Error al registrar este usuario, por favor contacte al administrador del sistema.",
                error: err
            });
        }
    }

    public routes() {
        this.router.post('/admin/register', this.registerAdminUser);
    }
}