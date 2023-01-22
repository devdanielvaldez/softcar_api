import { Schema, model, ObjectId, Types } from 'mongoose';

export interface IProfile {
    name: string;
    phone: string;
    email: string;
}

const profileSchema = new Schema<IProfile>({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Profile"
    }
);

export const Profile = model<IProfile>('Profile', profileSchema);