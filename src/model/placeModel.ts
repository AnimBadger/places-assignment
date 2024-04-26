import mongoose, { Schema } from "mongoose";

export interface IPlace {
    name: string
    description: string
    location: string
    openHours: string
    image: string
}

const placeSchema: Schema = new Schema(
    {
        name: { type: String, require: true },
        location: { type: String, require: true },
        openHours: { type: String, require: true },
        image: { type: String, require: true }
    },
    {
        versionKey: false
    }
)

export default mongoose.model<IPlace>('Places', placeSchema)