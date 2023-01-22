import { Schema, model, Types, ObjectId } from 'mongoose';

export interface IWareHouses {
    name: string;
    state: boolean;
    placesId: ObjectId;
}

const warehousesSchema = new Schema<IWareHouses>({
    name: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
    placesId: [{
        type: Types.ObjectId,
        ref: "Places"
    }]
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Warehouses"
    }
);

export const Warehouses = model<IWareHouses>('Warehouses', warehousesSchema);