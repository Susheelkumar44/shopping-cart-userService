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

module.exports = {createUser, getUserDetailsForLogin, updateUserQuery}