const router = require('express').Router()
const logController = require("../controllers/logs")

const logsRouters = (app) => {
    router.get("/:id", logController.getLastLog)
    router.post("/save", logController.saveLog)
    return app.use("/logs", router)
}

module.exports = {
    logsRouters
}