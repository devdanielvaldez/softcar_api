import { Schema, model, ObjectId } from 'mongoose';

export interface IBankDetails {
    beneficiary: string;
    bankAccount: string;
    bankEntity: string;
    showInvoce: boolean;
}

const bankDetailsSchema = new Schema<IBankDetails>({
    beneficiary: {
        type: String,
        required: true
    },
    bankAccount: {
        type: String,
        required: true
    },
    bankEntity: {
        type: String,
        required: true
    },
    showInvoce: {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Banks_Details"
    }
);

export const BanksDetails = model<IBankDetails>('BanksDetails', bankDetailsSchema);