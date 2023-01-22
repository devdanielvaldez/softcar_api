import { Schema, model } from 'mongoose';

export interface IVehicles {
    name: string;
    nPlate: string;
    state: boolean;
    chassis: string;
    environmentalLabel: string;
}

const vehiclesSchema = new Schema<IVehicles>({
    name: {
        type: String,
        required: true
    },
    nPlate: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
    chassis: {
        type: String,
        required: true
    },
    environmentalLabel: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Vehicles"
    }
);

export const Vehicles = model<IVehicles>('Vehicles', vehiclesSchema);