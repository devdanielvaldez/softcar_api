import { Schema, model } from 'mongoose';

export interface IModels {
    name: string;
    tankCapacity: number;
    state: boolean;
    recomended: boolean;
    image: Array<IImage>;
    description: string;
    optional: string;
    specialsConditions: string;
    capacity: number;
    nPeople: number;
    airConditioner: boolean;
    handGear: boolean;
    automaticGear: boolean;
    nDoors: number;
    gps: boolean;
    sunroof: boolean;
}

interface IImage {
    path: string;
    name: string;
}

const modelsSchema = new Schema<IModels>({
    name: {
        type: String,
        required: true
    },
    tankCapacity: {
        type: Number,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
    recomended: {
        type: Boolean,
        required: true
    },
    image: [Object],
    description: {
        type: String,
        required: true
    },
    optional: {
        type: String,
        required: false
    },
    specialsConditions: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    nPeople: {
        type: Number,
        required: true
    },
    airConditioner: {
        type: Boolean,
        required: true
    },
    handGear: {
        type: Boolean,
        required: true
    },
    automaticGear: {
        type: Boolean,
        required: true
    },
    nDoors: {
        type: Number,
        required: true
    },
    gps: {
        type: Boolean,
        required: true
    },
    sunroof: {
        type: Boolean,
        required: true
    },
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Models"
    }
);

export const Models = model<IModels>('Models', modelsSchema);