import { Schema, model } from 'mongoose';

export interface ISeasons {
    name: string;
    start: String;
    end: String;
    state: Boolean;
    amount: Number;
    type: String;
}

const seasonsSchema = new Schema<ISeasons>({
    name: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['add', 'substract']
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "Seasons"
    }
);

export const Seasons = model<ISeasons>('Seasons', seasonsSchema);