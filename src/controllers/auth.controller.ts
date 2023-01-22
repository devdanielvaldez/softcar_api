import { Router, Request, Response } from "express";
import { Credentials } from "../schema/credentials.schema";
import { Profile } from "../schema/profile.schema";
import { generate } from 'generate-password';
import { hashSync } from 'bcrypt';
import axios from "axios";

const SMS_URL: string = "https://rest.nexmo.com/sms/json";
const APIKEY_VONAGE: string = "b371598a";
const APISECRET_VONAGE: string = "67PNQcSaMccX3oOP";

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

            Credentials.findOne({ user: user.toLowerCase() })
            .then((data) => {
                if(data !== null) return res.status(400).json({
                    ok: false,
                    message: "El usuario que desea registrar ya se encuentra en uso dentro del sistema."
                });

                Profile.findOne({ email: email.toLowerCase() })
                .then(async (data) => {
                    if(data !== null) return res.status(400).json({
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

                    const hasPass = await hashSync(ramdonPass, 10);
        
                    const newProfile = new Profile({
                        name: name,
                        email: email.toLowerCase(),
                        phone: phone
                    });
        
                    newProfile.save((err, profile) => {
                        if(err !== null) return res.status(400).json({
                            ok: false,
                            message: "El usuario que desea registrar en estos momentos no se ha podido procesar, por favor intente mas tarde.",
                            error: err
                        });
        
                        const newCredentials = new Credentials({
                            user: user,
                            password: hasPass,
                            rol: 'admin',
                            profileId: profile._id,
                            firstLogin: true
                        });
        
                        newCredentials.save((error, credentials) => {
                            if(error !== null) return res.status(400).json({
                                ok: false,
                                message: "El usuario que desea registrar en estos momentos no se ha podido procesar, por favor intente mas tarde.",
                                error: error
                            });

                            axios
                            .post(SMS_URL, {
                                "from": "SoftCar RD",
                                "text": `Su contraseña temporal es: ${ramdonPass}`,
                                "to": phone,
                                "api_key": APIKEY_VONAGE,
                                "api_secret": APISECRET_VONAGE
                            })
                            .then(() => console.log('sent'));
        
                            return res.status(201).json({
                                ok: true,
                                message: "Usuario administrador creado correctamente",
                                data: credentials,
                                pass: ramdonPass
                            });
                        })
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