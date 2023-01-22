import { Schema, model } from 'mongoose';

export interface IFamilies {
    name: string;
    state: boolean;
}

const familiesSchema = new Schema<IFamilies>({
    name: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Families"
    }
);

export const Families = model<IFamilies>('Families', familiesSchema);