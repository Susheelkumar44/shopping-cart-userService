require("../model/model")
const controller = require("../controller/controller")
const authenticator = require("../middleware/webTokenAuthenticator")

const express = require("express")

const router = express.Router()

router.post("/", controller.registerUser)

router.post("/login", controller.loginUser)

router.put("/", controller.updateUser)

router.get("/", controller.getUser)

router.delete("/", controller.deleteUser)

module.exports = router