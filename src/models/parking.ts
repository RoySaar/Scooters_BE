import mongoose, {Document} from "mongoose";

export interface IParking extends Document {
    address: string;
    maxScooters: number;
    location: Location;
}

const parkingSchema = new mongoose.Schema({
    address: String,
    maxScooters: String,
    location: Location,
});

const Parking = mongoose.model<IParking>('Parking', parkingSchema);

export default Parking;