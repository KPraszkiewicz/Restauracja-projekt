'use strict';

const db = require('./db_connect')

const KomentarzSchema = new db.Schema({
    idu: { // id użytkownika
        type:String,
        require:true,
    },
    idd: { // id dania
        type:String,
        require:true,
    },
    nick: {
        type:String,
    },
    tytul: {
        type:String,
    },
    opis:{
        type:String,
    },
    data: {
        type:String,
    },
    ocena: {
        type:Number
    }
})

module.exports = db.model("komentarzModel", KomentarzSchema)