import { Schema, model } from 'mongoose';

export interface IClientsDocuments {
    dni: string;
    passport: string;
    drivingLicense: string;
    othersOne: string;
    othersTwo: string;
}

const clientsDocumentsSchema = new Schema<IClientsDocuments>({
    dni: String,
    passport: String,
    drivingLicense: String,
    othersOne: String,
    othersTwo: String
},
    {
        timestamps: true,
        versionKey: false,
        collection: "ClientsDocuments"
    }
);

export const ClientsDocuments = model<IClientsDocuments>('ClientsDocuments', clientsDocumentsSchema);