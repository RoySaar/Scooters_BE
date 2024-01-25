import mongoose from "mongoose";
import {Coordinates} from "./types";

export enum ScooterStatus {
    Active = 'active',
    Broken = 'broken',
    Handled = 'handled',
    Charged = 'charged',
}

export interface Scooter {
    id: string;
    currentLocation: Coordinates;
    model: string;
    yearOfManufacture: number;
    status: ScooterStatus;
}

const scooterSchema = new mongoose.Schema({
    id: String,
    model: String,
    yearOfManufacture: Number,
    status: String,
    currentLocation: {
        type: {
            latitude: Number,
            longitude: Number,
        },
        required: true,
    },
});

const ScooterModel = mongoose.model<Scooter>('Scooter', scooterSchema);

export default ScooterModel;
