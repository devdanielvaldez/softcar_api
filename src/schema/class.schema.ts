import { Schema, model, ObjectId, Types } from 'mongoose';

export interface IClass {
    name: string;
    state: boolean;
    familiesId: ObjectId
}

const classSchema = new Schema<IClass>({
    name: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
    familiesId: {
        type: Types.ObjectId,
        ref: "Families"
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Class"
    }
);

export const Class = model<IClass>('Class', classSchema);