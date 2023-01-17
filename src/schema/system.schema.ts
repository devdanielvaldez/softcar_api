import { Schema, model, connect } from 'mongoose';

export interface ISystem {
    firstAccess: boolean;
    apiKey: string;
    urlDashboard: string;
    urlApi: string;
    licenseNumber: string;
    licenseState: boolean;
}

const systemSchema = new Schema<ISystem>({
    firstAccess: {
        type: Boolean,
        required: true,
        default: true
    },
    apiKey: {
        type: String,
        required: [true, 'El valor API KEY es requerido por el sistema, por favor registre el sistema para continuar.']
    },
    urlDashboard: {
        type: String,
        required: [true, 'La URL del panel administrativo es requerida para continuar.']
    },
    urlApi: {
        type: String,
        required: [true, 'La URL del API SoftCar es requerida para continuar.']
    },
    licenseNumber: {
        type: String,
        required: true
    },
    licenseState: {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "System_Configuration"
    }
);

export const SystemConfiguration = model<ISystem>('System', systemSchema);