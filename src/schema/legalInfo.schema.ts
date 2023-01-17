import { Schema, model } from 'mongoose';

export interface ILegal {
    terms: string;
    aboutUs: string;
    termOfUse: string;
    privacy: string;
}

const legalSchema = new Schema<ILegal>({
    terms: {
        type: String,
        required: true
    },
    aboutUs: {
        type: String,
        required: true
    },
    termOfUse: {
        type: String,
        required: true
    },
    privacy: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Legal"
    }
);

export const Legal = model<ILegal>('Legal', legalSchema);