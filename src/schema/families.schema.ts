import { Schema, model, ObjectId, Types } from 'mongoose';

export interface IFamilies {
    name: string;
    state: boolean;
    classId:ObjectId
}

const familiesSchema = new Schema<IFamilies>({
    name: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
    classId: {
        type: Types.ObjectId,
        ref: "Class"
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Families"
    }
);

export const Families = model<IFamilies>('Families', familiesSchema);