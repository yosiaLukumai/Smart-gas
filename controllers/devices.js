const deviceModel = require("../models/devices");
const createOutput = require("../utils").createOutput;


const register = async (req, res) => {
    try {
        const { serialNumber, owner, name, updateRate, gross, loadCellWeight, reminderpercentage, newWeight } = req.body;
        const saved = await deviceModel.create({
            serialNumber,
            name,
            owner,
            configure: true,
            setting: {
                updateRate,
                reminderpercentage,
                tare: (newWeight - gross),
                gross: gross,
                loadCellWeight,
                newWeight
            }

        });
        if (saved) {
            return res.json(createOutput(true, saved));
        } else {
            return res.json(createOutput(false, saved));
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
};



const allLpgUserCylinder = async (req, res) => {
    try {
        const owner = req.params.owner
        const devices = await deviceModel.find({ owner });
        return res.json(createOutput(true, devices));
    } catch (error) {
        return res.json(false, error.message, true);
    }
};



const GetLpgByID = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await deviceModel.findById(id);
        if (user) {
            return res.json(createOutput(true, user));
        } else {
            return res.json(createOutput(true, "No cylinder"));
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
};





module.exports = {
    register,
    GetLpgByID,
    allLpgUserCylinder
};
