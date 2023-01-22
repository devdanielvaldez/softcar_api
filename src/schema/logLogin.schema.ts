import { Schema, model } from 'mongoose';

export interface ILogLogin {
    date: string;
    ip: string;
    explorer: string;
    os: string;
}

const logLoginSchema = new Schema<ILogLogin>({
    date: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    explorer: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "LogLogin"
    }
);

export const LogLogin = model<ILogLogin>('LogLogin', logLoginSchema);