import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import User, {IUser} from "../models/user";
import {isEmpty} from 'lodash';
import bcrypt from 'bcryptjs';

const SECRET = process.env.MY_SECRET_KEY || 'BUp6nvE+~|8n90:$ct)>pCxaqic3&B';

type RequestWithSession = Request & {
    session: {
        user?: IUser
    }
}

export const register = async (req: Request, res: Response) => {
    const {username, password, firstName, lastName, email} = req.body;

    console.log({passFromFe: password});

    const hashedPassword = await bcrypt.hash(password, 10);
    // const hashedPassword = await argon2.hash(password);

    console.log({reHashedPass: hashedPassword});

    const newUser = new User({username, password: hashedPassword, firstName, lastName, email});

    try {
        const existingUser: IUser | null = await User.findOne({username});

        if (existingUser) {
            return res.status(400).json({error: 'Username is already taken'});
        }

        await newUser.save();

        return res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
};

export const login = async (req: RequestWithSession, res: Response) => {
    const {username, password} = req.body;

    console.log({passFromFE: password});

    const user = await User.findOne({username});

    console.log({userPass: user?.password});

    try {
        if (isEmpty(user)) {
            return res.status(401).json({error: 'Invalid username or password'});
        }

        console.log({match: bcrypt.compareSync(password, user.password)});

        if (await bcrypt.compare(password, user.password)) {
        // if (await argon2.verify(password, user.password)) {
            const token = jwt.sign({username}, SECRET, {expiresIn: '1h'});

            // @ts-ignore
            req.session.user = user;

            res.json({token});
        } else {
            res.status(401).json({error: 'Invalid username or password'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
};
