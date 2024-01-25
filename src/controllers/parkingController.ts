import {Request, Response} from 'express';
import ParkingModel from '../models/parking';
import {isEmpty} from "lodash";

export const getAllParkings = async (req: Request, res: Response) => {
    try {
        const parkings = await ParkingModel.find();
        res.json(parkings);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
};

export const createParking = async (req: Request, res: Response) => {
    try {
        const {address, maxScooters, location} = req.body;
        const parking = new ParkingModel({
            address,
            maxScooters,
            location,
        });
        await parking.save();
        res.json(parking);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
};

export const updateParking = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {address, maxScooters, location} = req.body;

        const updatedParking = await ParkingModel.findByIdAndUpdate(
            id,
            {address, maxScooters, location},
            {new: true}
        );

        if (!updatedParking) {
            return res.status(404).json({message: 'Parking not found'});
        }

        res.json(updatedParking);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
};

export const deleteParking = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const deletedParking = await ParkingModel.findByIdAndDelete(id);

        if (!deletedParking) {
            return res.status(404).json({message: 'Parking not found'});
        }

        res.json(deletedParking);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
};

export const getParkingAvailability = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const parking = await ParkingModel.findById(id);

        if (isEmpty(parking)) {
            return res.status(401).json({message: 'Parking not  found'});
        }

        const availableSpots = parking.maxScooters - (parking?.currentScooters || 0);

        res.json({availalbe: availableSpots});
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
}

export const getAvailableSpots = async (req: Request, res: Response) => {
    try {
        const availableSpots = await ParkingModel.find({
            currentScooters: {$lt: '$maxScooters'},
        });

        res.json({availableSpots});
    } catch (error) {
        console.error('Error checking available parking:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}