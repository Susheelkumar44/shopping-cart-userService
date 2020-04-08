const repository = require("../dbRepo/repository")
const httpStatus = require("http-status-codes")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticator = require("../middleware/webTokenAuthenticator")

require('dotenv').config()

exports.registerUser = async (req, res) => {
    try {
       // const salt = await bcrypt.genSalt()
        req.body.encryptedPassword = await bcrypt.hash(req.body.encryptedPassword, 10)
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

exports.loginUser = async (req, res) => {
    try {
        const userDetails = await repository.getUserDetailsForLogin(req.body.email)
        if (userDetails == null){
            res.status(403).json({code: 403, type: httpStatus.getStatusText(403), message:"User Does not Exist"}) 
        }
        try {
            if (await bcrypt.compare(req.body.encryptedPassword, userDetails.encryptedPassword)) {
                               
                const accessToken = jwt.sign(userDetails.toObject(), process.env.ACCESS_TOKEN_SECRET)
                res.set({
                    'Content-Type': 'application/json',
                    'Status' : 200})
                res.status(200).json({code: 200, type: httpStatus.getStatusText(200), message:"Successfully logged In", accessToken})
            } else {
                res.set({
                                'Content-Type': 'application/json',
                                'Status' : 404})
                            res.status(404).json({code: 404, type: httpStatus.getStatusText(404), message:"Unable to login"})
            }            
        }catch(err) {
            logger.info(`Error in decrypting password and Error is: ${err}`);
            res.status(500).json({code: 500, type: httpStatus.getStatusText(500), message:"Internal Server Error"})
        }
    }catch(err) {
        logger.info(`Error in getting user and Error is: ${err}`);
        res.status(500).json({code: 500, type: httpStatus.getStatusText(500), message:"Internal Server Error"})
    }
}

exports.updateUser = async (req, res) => {
    try{
        if (req.body.encryptedPassword != null) {
            req.body.encryptedPassword = await bcrypt.hash(req.body.encryptedPassword, 10)
        }
        const editedUser = await repository.updateUserQuery(req.params.id, req.body)
        if ((editedUser.nModified + editedUser.nMatched)=== 0) {
            throw "No Records Updated"
        }
        res.set({
            'Content-Type': 'application/json',
            'Status' : 200})
        res.send({ "code": "200", "type":httpStatus.getStatusText(200), "message":"Successfull Operation"});

    }catch(err) {
        logger.info(`Error in updating products and Error is: ${err}`);
        res.status(405).json({code: 405, type: httpStatus.getStatusText(405), message: "Invalid Input! Please try again"}) 
    }
}

exports.getUser = async (req, res) => {
    try{
        const authHeader = req.headers["authorization"]
        tokenDetails = authenticator.getUserDetailsFromToken(authHeader)
        console.log("Token ID",tokenDetails._id)
       // const user = await repository.getUserByID(tokenDetails._id, req.body)
    }catch(err) {
        console.log(err)
    }
}
