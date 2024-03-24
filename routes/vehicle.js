const express = require('express');
const Vehicle = require('../models/Plate.js');
const Park = require('../models/Parking.js');
const { assignParking, deleteParking } = require('../utils/parking.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const vehicles = await Park.find();
        res.json(vehicles);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:PlateNum', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.PlateNum);
        res.json(vehicle);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/out', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const duplicate = await Park.find({ PlateNum: `${req.body.PlateNum}` }).exec();
    if (duplicate[0]) {
        const dup = await Vehicle.find({ PlateNum: `${req.body.PlateNum}` }).exec();
        deleteParking(req.body.PlateNum);
        const date = new Date();
        const diff = date - dup[0].Entry;
        const fare = diff * 0.0000034;
        const filter = { PlateNum: dup[0].PlateNum };
        const update = { Exit: date, fare: fare };
        let doc = await Vehicle.findOneAndUpdate(filter, update, { new: true });
        res.json({ doc });
    } else {
        res.json({ message: "Car has not entered in the system" });
    }
});

router.post('/in', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const vehicle = new Vehicle();
    const park = new Park();
    vehicle.PlateNum = req.body.PlateNum;
    vehicle.Entry = new Date();
    vehicle.Exit = null;
    vehicle.fare = null;
    vehicle.Slot = null;
    const duplicate = await Park.find({ PlateNum: `${vehicle.PlateNum}` }).exec();
    if (!duplicate[0]) {
        let slot = await assignParking(req.body.PlateNum);
        vehicle.Slot = slot;
        try {
            const savedPlate = await vehicle.save();
            res.json(savedPlate);
        } catch (err) {
            res.json({ message: err });
        }
    } else {
        res.json({ message: "Car has already entered in the system" });
    }
});

module.exports = router;
