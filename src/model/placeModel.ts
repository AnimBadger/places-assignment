import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IPlace {
    placeId: string;
    name: string;
    description: string;
    location: string;
    /** change how to handle open hours. eg. 10:00 - 24:00 */
    openHours: string;
    image: string;
}

const placeSchema: Schema = new Schema(
    {
        placeId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        openHours: { type: String, required: true },
        image: { type: String, required: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

placeSchema.pre<IPlace>('save', function (next) {
    if (!this.placeId) {
        this.placeId = uuidv4();
    }
    next();
});

export default mongoose.model<IPlace>('Place', placeSchema);