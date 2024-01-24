import {Request, Response} from 'express';
import User from '../models/user';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const {
            username,
            password,
            firstName,
            lastName,
            email
        } = req.body;
        const user = new User({
            username,
            password,
            firstName,
            lastName,
            email
        });
        await user.save();
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
