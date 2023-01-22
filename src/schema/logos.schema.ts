import { Schema, model } from 'mongoose';

export interface ILogos {
    contract: string;
    invoce: string;
    web: string;
    emails: string;
    damage: string;
}

const logosSchema = new Schema<ILogos>({
    contract: {
        type: String,
        required: true
    },
    invoce: {
        type: String,
        required: true
    },
    web: {
        type: String,
        required: true
    },
    emails: {
        type: String,
        required: true
    },
    damage: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Logos"
    }
);

export const Logos = model<ILogos>('Logos', logosSchema);