import {Request, Response} from 'express';
import ScooterModel, {ScooterStatus} from "../models/scooter";
import {Coordinates} from "../models/types";

export const getAllScooters = async (req: Request, res: Response) => {
    try {
        const scooters = await ScooterModel.find();
        res.json(scooters);
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
};

export const createScooter = async (req: Request, res: Response) => {
    try {
        const {
            id,
            currentLocation,
            model,
            yearOfManufacture,
            status,
        } = req.body;
        const scooter = new ScooterModel({
            id,
            currentLocation,
            model,
            yearOfManufacture,
            status,
        });
        await scooter.save();
        res.json(scooter);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateScooter = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { currentLocation, model, yearOfManufacture, status } = req.body;

        const updatedScooter = await ScooterModel.findByIdAndUpdate(
            id,
            { currentLocation, model, yearOfManufacture, status },
            { new: true }
        );

        if (!updatedScooter) {
            return res.status(404).json({ message: 'Scooter not found' });
        }

        res.json(updatedScooter);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteScooter = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedScooter = await ScooterModel.findByIdAndDelete(id);

        if (!deletedScooter) {
            return res.status(404).json({ message: 'Scooter not found' });
        }

        res.json(deletedScooter);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getScootersByStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;

        const scooters = await ScooterModel.find({ status: status });
        res.json(scooters);
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
};

export const getScootersByPolygon = async (req: Request, res: Response) => {
    try {
        const polygonCoordinates: Coordinates[] = req.body.polygon;

        // Query the database for scooters within the given polygon
        const scootersWithinPolygon = await ScooterModel.find({
            currentLocation: {
                $geoWithin: {
                    $geometry: {
                        type: 'Polygon',
                        coordinates: [polygonCoordinates],
                    },
                },
            },
        });

        res.json({ scooters: scootersWithinPolygon });
    } catch (error) {
        console.error('Error filtering scooters by polygon:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}