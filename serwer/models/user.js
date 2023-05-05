'use strict';

const db = require('./db_connect')

const UserSchema = new db.Schema({
    nazwa: {
        type:String,
        require:true,
        unique: true 
    },
    haslo:{
        type:String,
        require:true,
    },
    role: {
        type: [String],
    }
})

module.exports = db.model("userModel", UserSchema)