const repository = require("../dbRepo/repository")
const httpStatus = require("http-status-codes")
const md5 = require("md5")

exports.registerUser = async (req, res) => {
    try {
        req.body.encryptedPassword = md5(req.body.encryptedPassword)
        const savedUser = await repository.createUser(req.body)
        res.set({
            'Content-Type': 'application/json',
            'Status' : 201
        })
        res.send({"code": 201, "type":httpStatus.getStatusText(201), 
        "message":"Successfull Operation", "productID": savedUser._id })
    } catch(err) {
        logger.info(`Error in storing user and Error is: ${err}`);
        res.status(405).json({code: 405, type: httpStatus.getStatusText(405), message:"Invalid Input! Please try again"})
    }
}

