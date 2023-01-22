import { Schema, model } from 'mongoose';

export interface IGuarantors {
    firstName: String;
    lastName: String;
    dni: String;
    phone: String;
    address: String;
    city: String;
    zipCode: String;
    notes: string;
}

const guarantorsSchema = new Schema<IGuarantors>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Guarantors"
    }
);

export const Extras = model<IGuarantors>('Guarantors', guarantorsSchema);