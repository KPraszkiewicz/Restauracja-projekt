'use strict';

const db = require('./db_connect')

const DanieSchema = new db.Schema({
    nazwa: {
        type:String,
        require:true,
        unique: true 
    },
    opis:{
        type:String,
    },
    cena: {
        type:Number,
        require:true
    },
    obrazy: {
        type:[String],
        require:true
    },
    typ: {
        type:String,
        require:true
    },
    kategoria: {
        type:String,
        require:true
    },
    skladniki: {
        type:[String],
        require:true
    },
    dostepnosc: {
        type:Number,
        require:true
    },
    ///////////////////////
    popularnosc: {
        type:Number,
        require:true,
        default: 0
    },
    ocena: {
        type:Number,
        require:true,
        default: 0
    },
    ocena_calk: {
        type:Number,
        default: 0
    },
    ilosc_ocen: {
        type:Number,
        require:true,
        default: 0
    },
})

module.exports = db.model("daniaModel", DanieSchema)