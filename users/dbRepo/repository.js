const mongoose = require("mongoose")
mongoose.set('debug', true)

const User = mongoose.model("User")

const createUser = (data) => {
    const user = new User(data)
    console.log(user)
    return user.save();
}

module.exports = {createUser}