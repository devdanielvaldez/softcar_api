import { Schema, model } from 'mongoose';

export interface IPlaces {
    name: string;
    phone: string;
    state: boolean;
}

const placesSchema = new Schema<IPlaces>({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    state: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Places"
    }
);

export const Taxes = model<IPlaces>('Places', placesSchema);