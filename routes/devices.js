const router = require('express').Router()
const deviceController = require("../controllers/devices")

const devicesRoutes = (app) => {
    router.get("/:id", deviceController.GetLpgByID)
    router.post("/register", deviceController.register)
    router.patch("/:owner", deviceController.allLpgUserCylinder)
    return app.use("/devices", router)
}

module.exports = {
    devicesRoutes
}