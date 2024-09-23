const logModel = require("../models/log");
const createOutput = require("../utils").createOutput;


const saveLog = async (req, res) => {
    try {
        const { serialNumber, levelPercentage, lpg_weight } = req.body;
        const saved = await logModel.create({
            serialNumber,
            levelPercentage,
            lpg_weight,
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





const getLastLog = async (req, res) => {
    try {
        const serialNumber = req.params.serialNumber;
        const lpgLast = await logModel.find({serialNumber});
        if (lpgLast) {
            return res.json(createOutput(true, user));
        } else {
            return res.json(createOutput(true, "No cylinder"));
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
};





module.exports = {
    getLastLog,
    saveLog
};
