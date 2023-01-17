import { Schema, model, connect } from 'mongoose';

export interface IBusinessSetting {
    bookingCode: string;
    contractCode: string;
    initialNumbersBookings: number;
    currency: string;
    timeZone: string;
    invonceReferenceCode: string;
    creditNotesCode: string;
    initialNumbersInvoce: number;
    tradeName: string;
    officialName: string;
    rncID: string;
    address: string;
    city: string;
    zipCode: string;
    province: string;
    country: string;
    phone: string;
    email: string;
    website: string;
    receivingNotifications: string;
    emailSendNotifications: string;
    userSMTP: string;
    passwordSMTP: string;
    hostSMTP: string;
    protocalSMTP: string;
    port: number;
    facebook: string;
    twitter: string;
    instagram: string;
}

const businessSettingSchema = new Schema<IBusinessSetting>({
    bookingCode: {
        type: String,
        required: true
    },
    contractCode: {
        type: String,
        required: true
    },
    initialNumbersBookings: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    timeZone: {
        type: String,
        required: true
    },
    invonceReferenceCode: {
        type: String,
        required: true
    },
    creditNotesCode: {
        type: String,
        required: true
    },
    initialNumbersInvoce: {
        type: Number,
        required: true
    },
    tradeName: {
        type: String,
        required: true
    },
    officialName: {
        type: String,
        required: true
    },
    rncID: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: false
    },
    province: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: false
    },
    receivingNotifications: {
        type: String,
        required: true
    },
    emailSendNotifications: {
        type: String,
        required: true
    },
    userSMTP: {
        type: String,
        required: true
    },
    passwordSMTP: {
        type: String,
        required: true
    },
    hostSMTP: {
        type: String,
        required: true
    },
    protocalSMTP: {
        type: String,
        required: true
    },
    port: {
        type: Number,
        required: true
    },
    facebook: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Business_Setting"
    }
);

export const BusinessSetting = model<IBusinessSetting>('BusinessSetting', businessSettingSchema);