const DanieModel = require('../models/danie')
const KomentarzModel = require('../models/komentarz')

exports.get_info = (req, res) => {
    DanieModel.find().then(dane => {
        res.status(200).send({
            ilosc_dan: dane.length
        })
    })
}

exports.get_dania = (req, res) => {
    console.log("get_dania");
    console.log(req.query)
    let wynik = DanieModel.find()
    if(req.query.cena_od)
        wynik = wynik.find({cena: {$gte: req.query.cena_od }})
    if(req.query.cena_do)
        wynik = wynik.find({cena: {$lte: req.query.cena_do }})
    if(req.query.typ)
    {
        wynik = wynik.find({typ: req.query.typ})
    }
        
    if(req.query.kat)
        wynik = wynik.find({kategoria: req.query.kat})
    if(req.query.gw)
        wynik = wynik.find({ocena_calk: {$in: req.query.gw.split(',')}})

    wynik
        .skip(req.query.od)
        .limit(req.query.do)
        .then(dania => {
            res.status(200).send(dania)
        })

}

exports.get_danie = (req, res) => {
    console.log("get_danie");
    console.log(req.params.id)
    DanieModel.findOne({_id : req.params.id}).then(danie =>{
        res.status(200).send(danie)
    })
    .catch(err =>{
        res.status(404).end()
    })
    
}

exports.put_danie = (req, res) => {
    console.log("put_danie");
    console.log(req.body)
}

exports.delete_danie = (req, res) => {
    console.log("delete_danie");
    console.log(req.params)

    DanieModel.deleteOne({_id: req.params.id}).then(dane =>{
        //TODO: delete_komentarze
        res.status(200).send(dane)
    })
    .catch(err =>{
        res.status(404).end()
    })
}

exports.post_danie = (req, res) => {
    console.log("post_danie");
    let nowy = new DanieModel(req.body)

    nowy.save().then(data => {
        res.status(200).send({'ok': true})
    }).catch(err =>{
        res.status(200).send({'ok': false})
    })
}

exports.put_ocena = async (req, res) => {
    console.log("put_ocena");
    console.log(req.params, req.body)

    let danie = await DanieModel.findOne({_id: req.params.id})
    let kom = await KomentarzModel.findOne({idd: req.body.idd, idu: req.body.idu})


    let nowa = danie.ocena*danie.ilosc_ocen + req.body.ocena
    let ilosc = danie.ilosc_ocen + 1
    let err500 = false
    if(kom) 
    {
        if(kom.ocena > 0) // nowa ocena
        {
            nowa -=  kom.ocena
            ilosc -= 1
        }

        kom.ocena = req.body.ocena

        await kom.save().catch(err=>{
            res.status(500).send(err)
            err500 = true
        })
    }
    else // nowy komentarz
    {
        let kom2 = new KomentarzModel({
            ocena: req.body.ocena, 
            idd: req.body.idd,
            idu: req.body.idu,
        })
        
        await kom2.save().catch(err=>{
            res.status(500).send(err)
            err500 = true
        })
        
    }
    if(err500)
        return

    danie.ilosc_ocen = ilosc
    danie.ocena = nowa/danie.ilosc_ocen 
    danie.ocena_calk = Math.round(danie.ocena)
    

    danie.updateOne({
        ocena: danie.ocena, 
        ilosc_ocen: danie.ilosc_ocen,
        ocena_calk: danie.ocena_calk
    }).then(data => {
        console.log("X5")
        res.status(200).send({'ok': true})
    }).catch(err =>{
        console.log("X5")
        res.status(200).send({'ok': false})
    })
}