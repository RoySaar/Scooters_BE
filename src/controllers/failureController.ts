import { Request, Response } from 'express';
import FailureModel, { Failure, FailureType, FailureStatus } from '../models/failure';
import ScooterModel from "../models/scooter";
import {isEmpty} from "lodash";

export const getAllFailures = async (req: Request, res: Response) => {
    try {
        const failures = await FailureModel.find();
        res.json(failures);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createFailure = async (req: Request, res: Response) => {
    try {
        const { type, status, openingTime, closingTime, scooterId } = req.body;
        const failure = new FailureModel({
            type,
            status,
            openingTime,
            closingTime,
            scooterId
        });
        await failure.save();
        res.json(failure);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateFailure = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { type, status, openingTime, closingTime, scooterId } = req.body;

        const updatedFailure = await FailureModel.findByIdAndUpdate(
            id,
            { type, status, openingTime, closingTime, scooterId },
            { new: true }
        );

        if (!updatedFailure) {
            return res.status(404).json({ message: 'Failure not found' });
        }

        res.json(updatedFailure);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteFailure = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedFailure = await FailureModel.findByIdAndDelete(id);

        if (!deletedFailure) {
            return res.status(404).json({ message: 'Failure not found' });
        }

        res.json({ message: 'Failure deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const failureHistory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const scooter = ScooterModel.findById(id);

        if (isEmpty(scooter)) {
            res.status(401).json({ message: 'Scooter not found' });
        }

        const failures = FailureModel.find({
            scooterId: id
        });

        res.json({failures});
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}