import { Schema, model, ObjectId } from 'mongoose';

export interface IPaymentMethods {
    bankTransferState: boolean;
    payDestination: boolean;
    cardPaymentState: boolean;
    defaultPaymentMethod: number;
    bankDetails: ObjectId;
}

const paymentMethodsSchema = new Schema<IPaymentMethods>({
    bankTransferState: {
        type: Boolean,
        required: true,
        default: false
    },
    payDestination: {
        type: Boolean,
        required: true,
        default: false
    },
    cardPaymentState: {
        type: Boolean,
        required: true,
        default: false
    },
    defaultPaymentMethod: {
        type: Number,
        required: true,
        default: 1,
        enum: [1, 2, 3] // 1 = Banks Transfert, 2 = Card Payment, 3 = Pay Destination
    },
    bankDetails: {
        type: Schema.Types.ObjectId,
        ref: "BanksDetails"
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Payment_Methods"
    }
);

export const PaymentMethods = model<IPaymentMethods>('PaymentMethods', paymentMethodsSchema);