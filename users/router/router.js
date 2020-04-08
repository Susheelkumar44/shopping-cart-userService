require("../model/model")
const controller = require("../controller/controller")

const express = require("express")

const router = express.Router()

router.post("/", controller.registerUser)

module.exports = router