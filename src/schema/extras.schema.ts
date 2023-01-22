import { Schema, model } from 'mongoose';

export interface IExtras {
    name: string;
    limitDays: number;
    forDays: boolean;
    state: boolean;
    recommended: boolean;
    price: number;
}

const extrasSchema = new Schema<IExtras>({
    name: {
        type: String,
        required: true
    },
    limitDays: {
        type: Number,
        required: true
    },
    forDays: {
        type: Boolean,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
    recommended: {
        type: Boolean,
        required:true
    },
    price: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Extras"
    }
);

export const Extras = model<IExtras>('Extras', extrasSchema);