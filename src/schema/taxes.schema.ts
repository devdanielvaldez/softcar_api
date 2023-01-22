import { Schema, model } from 'mongoose';

export interface ITaxes {
    name: string;
    value: number;
}

const taxesSchema = new Schema<ITaxes>({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Taxes"
    }
);

export const Taxes = model<ITaxes>('Taxes', taxesSchema);