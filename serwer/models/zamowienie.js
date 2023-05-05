'use strict';

const db = require('./db_connect')

const ZamowienieSchema = new db.Schema({
    idu: {
        type:String,
        require:true,
    },
    data: {
        type:Date,
        require:true,
    },
    status: {
        type: Number,
        require: true
    },
    dania:{
        type:[{String, Number}],
        require:true,
    },
})

module.exports = db.model("ZamowienieModel", ZamowienieSchema)