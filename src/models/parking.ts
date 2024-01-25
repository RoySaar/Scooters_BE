import mongoose, {Document} from "mongoose";
import {Coordinates} from "./types";

export interface Parking extends Document {
    address: string;
    maxScooters: number;
    location: Coordinates;
    currentScooters?: number;
}

const parkingSchema = new mongoose.Schema({
    address: String,
    maxScooters: String,
    location: {
        type: {
            latitude: Number,
            longitude: Number,
        },
        required: true,
    },
});

const ParkingModel = mongoose.model<Parking>('Parking', parkingSchema);

export default ParkingModel;