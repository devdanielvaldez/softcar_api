import { Schema, model } from 'mongoose';

export interface IProviders {
    name: string;
    rnc: string;
    phone: string;
    email: string;
    address: string;
    category: string;
}

const providersSchema = new Schema<IProviders>({
    name: {
        type: String,
        required: true
    },
    rnc:  {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Providers"
    }
);

export const Providers = model<IProviders>('Providers', providersSchema);