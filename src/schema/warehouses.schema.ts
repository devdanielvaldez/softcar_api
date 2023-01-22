import { Schema, model } from 'mongoose';

export interface IWareHouses {
    name: string;
    state: boolean;
}

const warehousesSchema = new Schema<IWareHouses>({
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
        collection: "Warehouses"
    }
);

export const Warehouses = model<IWareHouses>('Warehouses', warehousesSchema);