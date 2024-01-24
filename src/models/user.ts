import mongoose, {Document} from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
}

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;