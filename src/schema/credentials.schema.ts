import { Schema, model, ObjectId, Types } from 'mongoose';

export interface ICredentials {
    user: string;
    password: string;
    logLogin: ObjectId;
    rol: string;
    profileId: ObjectId;
    firstLogin: boolean;
}

const credentialsSchema = new Schema<ICredentials>({
    user: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['admin', 'manager', 'agent']
    },
    logLogin: [{
        type: Types.ObjectId,
        ref: "LogLogin"
    }],
    profileId: {
        type: Types.ObjectId,
        ref: "Profile"
    },
    firstLogin: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Credentials"
    }
);

export const Credentials = model<ICredentials>('Credentials', credentialsSchema);