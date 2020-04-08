require("../model/model")
const controller = require("../controller/controller")
const authenticator = require("../middleware/webTokenAuthenticator")

const express = require("express")

const router = express.Router()

router.post("/", controller.registerUser)

router.post("/login", controller.loginUser)

router.put("/:id", authenticator.authenticateToken, controller.updateUser)

router.get("/", authenticator.authenticateToken, controller.getUser)

module.exports = router