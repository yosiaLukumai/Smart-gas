const mongoose = require("mongoose")

const Logs = mongoose.Schema({
    serialNumber: {
        type: String,
        required: true
    },
    levelPercentage: Number,
    lpg_weight: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})


module.exports = mongoose.model("logs", Logs)