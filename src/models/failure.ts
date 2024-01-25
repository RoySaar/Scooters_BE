import mongoose, {Document} from "mongoose";

export enum FailureType {
    RoutineCare = 'routineCare',
    BrakeReplacement = 'brakeReplacement',
    WheelReplacement = 'wheelReplacement',
}

export enum FailureStatus {
    Open = 'open',
    Care = 'care',
    Closed = 'closed',
}

export interface Failure extends Document {
    type: FailureType;
    status: FailureStatus;
    openingTime: number;
    closingTime: number;
    scooterId: string;
}

const failureSchema = new mongoose.Schema({
    type: String,
    status: String,
    openingTime: Number,
    closingTime: Number,
    scooterId: String,
});

const FailureModel = mongoose.model<Failure>('Failure', failureSchema);

export default FailureModel;