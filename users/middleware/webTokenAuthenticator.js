const jwt = require('jsonwebtoken')
const httpStatus = require("http-status-codes")

require('dotenv').config()

//custom middleware for authenticating JWT
exports.authenticateToken =  (req, res, next) => {
    const authHeader = req.headers['authorization']

    //authHeader && -- basically says if you have authHeader then go ahead with second operation i.e., authHeader.split(' ')[1]
    /*authHeader.split(' ')[1] -- authHeader will be like: Bearer <Token>, so we need separate Bearer keyword from 
    <Token> and we want only <Token> so we split and access 2nd value of an array*/

    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({code: 401, type: httpStatus.getStatusText(401), 
        message:"You are not authorized to perform this action"})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({code: 403, type: httpStatus.getStatusText(403), 
            message:"Invalid token"})
        req.user = user
        next()
    })

}

exports.getUserDetailsFromToken = (authHeader) => {
        const token = authHeader && authHeader.split(' ')[1]
        if (token) {
           jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
               if (err) throw err
               tokenDetails = user
               console.log(tokenDetails)
           })
        }
    return tokenDetails
}