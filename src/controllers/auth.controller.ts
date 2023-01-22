import { Router, Request, Response } from "express";
import { Credentials } from "../schema/credentials.schema";
import { Profile } from "../schema/profile.schema";
import { LogLogin } from "../schema/logLogin.schema";
import { generate } from 'generate-password';
import { compareSync, hashSync } from 'bcrypt';
import axios from "axios";
import jwt from 'jsonwebtoken';

const SMS_URL: string = "https://rest.nexmo.com/sms/json";
const APIKEY_VONAGE: string = "b371598a";
const APISECRET_VONAGE: string = "67PNQcSaMccX3oOP";

interface IRegisterAdmin {
    user: string;
    name: string;
    phone: string;
    email: string;
}

interface ILogin {
    user: string;
    password: string;
    logLogin: ILogLogin;
}

interface ILogLogin {
    date: string;
    ip: string;
    explorer: string;
    os: string;
}

interface IFirstLogin {
    id: string;
    oldPassword: string;
    newPassword: string;
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

    public loginAdmin = async(req: Request, res: Response) => {
        try {
            const body: ILogin = req.body;
            const {
                user,
                password,
                logLogin
            } = body;

            Credentials.findOne({ user: user })
            .populate('profileId')
            .populate('logLogin')
            .then(async (data) => {
                if(data == null) return res.status(401).json({
                    ok: false,
                    message: "Usuario o Contraseña invalidos."
                });

                const validatePassword = await compareSync(password, data.password);

                if(!validatePassword) return res.status(401).json({
                    ok: false,
                    message: "Usuario o Contraseña invalidos."
                });

                const newLog = new LogLogin({
                    date: logLogin.date,
                    ip: logLogin.ip,
                    explorer: logLogin.explorer,
                    os: logLogin.os
                });

                newLog.save((err, log) => {
                    Credentials.findByIdAndUpdate(data._id, {
                        $push: {
                            logLogin: log._id
                        }
                    }).exec();
                });

                const token = jwt.sign({
                    data: {
                        user: data.user,
                        id: data._id,
                        profileId: data.profileId
                    }
                }, 'secret', {
                    expiresIn: '4h'
                });

                if(data.firstLogin) return res.status(200).json({
                    ok: true,
                    accessToken: token,
                    firstLogin: true,
                    data: data
                });

                return res.status(200).json({
                    ok: true,
                    accessToken: token,
                    firstLogin: true,
                    user: data
                })
            })
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                message: "Error al iniciar sesión, por favor contacte al administrador del sistema.",
                error: err
            });
        }
    }

    public changePasswordFirstLogin = async(req: Request, res: Response) => {
        try {
            const body: IFirstLogin = req.body;
            const {
                id,
                oldPassword,
                newPassword
            } = body;

            Credentials.findById(id)
            .then(async (data) => {
                if(data == null) return res.status(404).json({
                    ok: false,
                    message: "Este usuario no existe en el sistema"
                });

                const comparePass = await compareSync(oldPassword, data.password);

                if(!comparePass) return res.status(400).json({
                    ok: false,
                    message: "La contraseña introducida es incorrecta"
                });

                const hassPass = await hashSync(newPassword, 10);

                Credentials.findByIdAndUpdate(id, {
                    password: hassPass,
                    firstLogin: false
                })
                .then((data) => {
                    return res.status(200).json({
                        ok: true,
                        message: "Contraseña actualizada correctamente"
                    });
                })
            })
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                message: "Error al iniciar sesión, por favor contacte al administrador del sistema.",
                error: err
            });
        }
    }

    public routes() {
        this.router.post('/admin/register', this.registerAdminUser);
        this.router.post('/admin/login', this.loginAdmin);
        this.router.put('/admin/change-password/init', this.changePasswordFirstLogin);
    }
}