import { Schema, model } from 'mongoose';

export interface IGroups {
    name: string;
    preBooking: number;
    state: boolean;
}

const groupsSchema = new Schema<IGroups>({
    name: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
    preBooking: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Groups"
    }
);

export const Groups = model<IGroups>('Groups', groupsSchema);