import { Schema, model, ObjectId, Types } from 'mongoose';

export interface IClients {
    firstName: string;
    lastName: string;
    id: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
    phone: string;
    language: string;
    dateofBirth: string;
    state: String;
    documents: ObjectId;
    requiresGuarantor: Boolean;
    notes: string;
    guarantor: ObjectId
}

const clientsSchema = new Schema<IClients>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    email: {
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
    language: {
        type: String,
        required: true
    },
    dateofBirth: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        enum: ['active', 'inactive', 'block']
    },
    documents: {
        type: Types.ObjectId,
        ref: "ClientsDocuments"
    },
    requiresGuarantor: {
        type: Boolean,
        required: true
    },
    notes:  {
        type: String,
        required: false
    },
    guarantor: {
        type: Types.ObjectId,
        ref: "Guarantors"
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Clients"
    }
);

export const Clients = model<IClients>('Clients', clientsSchema);