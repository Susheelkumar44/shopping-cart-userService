const mongoose = require("mongoose")
mongoose.set('debug', true)

const User = mongoose.model("User")

const createUser = (data) => {
    const user = new User(data)
    console.log(user)
    return user.save();
}

const getUserDetailsForLogin = (email) => {
    userDetails = User.findOne({email: email, IsDeleted : false})
    return userDetails
}

const updateUserQuery = (userid, data) => {
    const id = mongoose.Types.ObjectId(userid)
    updateData = User.updateOne({_id : id}, {$set: data})
    return updateData
}

const getUserByID = (userid) => {
    console.log("userID before object is ", userid)
    const id = mongoose.Types.ObjectId(userid)
    console.log("ID is ", id)
    const userDetails = User.findOne({_id: id, IsDeleted: false}, {"encryptedPassword": 0, "IsDeleted" : 0})
    return userDetails
}

const deleteUserByID =(userid) => {
    const id = mongoose.Types.ObjectId(userid)
    return User.updateOne({_id : id}, {IsDeleted : true})
}

module.exports = {createUser, getUserDetailsForLogin, updateUserQuery, getUserByID, deleteUserByID}