const mongoose = require("mongoose")


const Devices = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    serialNumber: {
        type: String,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    configure: Boolean,
    setting: {
        updateRate: Number,
        reminderpercentage: Number,
        tare: Number,
        gross: Number,
        newWeight: Number,
        loadCellWeight: Number
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("devices", Devices)