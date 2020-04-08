const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        firstName : {
            type : String
        },
        lastName : {
            type  : String
        },
        email : {
            type : String
        },
        phone : {
            type : String
        },
        address : {
            addressLine : String,
            city : String,
            state : String,
            zip : String,
        },
        encryptedPassword: {
            type : String
        },
        IsDeleted : {
            type : Boolean,
            default : false
        }
    },{versionKey: false,
   })
    
    

module.exports = mongoose.model("User", usersSchema);