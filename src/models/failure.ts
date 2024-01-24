import mongoose, {Document} from "mongoose";

export enum FailureType {
    RoutineCare,
    BrakeReplacement,
    WheelReplacement,
}

export enum FailureStatus {
    Open,
    Care,
    Closed,
}

export interface IFailure extends Document {
    type: FailureType;
    status: FailureStatus;
    openingTime: number;
    closingTime: number;
}

const failureSchema = new mongoose.Schema({
    type: String,
    status: String,
    openingTime: Number,
    closingTime: Number,
});

const Failure = mongoose.model<IFailure>('Failure', failureSchema);

export default Failure;