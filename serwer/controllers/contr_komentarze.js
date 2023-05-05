const KomentarzModel = require('../models/komentarz')

exports.get_komentarze = (req, res) => {
    console.log("get_komentarze");
    console.log(req.params)

    KomentarzModel.find({idd: req.params.idd}).then(kom => {
        res.status(200).send(kom)
    })
}

exports.get_komentarz = (req, res) => {
    console.log("get_komentarz");
    console.log(req.params)

    KomentarzModel.findOne({_id : req.params.id}).then(kom =>{
        res.status(200).send(kom)
    })
    .catch(err =>{
        res.status(404).end()
    })
}

exports.post_komentarz = (req, res) => {
    console.log("post_komentarz");
    req.body._id = undefined
    console.log(req.body)
    let idu = req.body.idu
    if(!idu)
    {
        res.sendStatus(500)
    }

    KomentarzModel.findOne({idu: idu, idd: req.params.idd}).then(kom =>{
        console.log(kom)
        if(kom) {
            if(kom.tytul && kom.tytul != "")
            {
                console.log("JAK TO ISTNIEJE", kom)
                res.status(403).send({
                    ok:false,
                    msg: "komentarz już istnieje"
                })
                return
            }
            kom.idd= req.params.idd, 
            kom.idu= idu,
            kom.nick= req.body.nick,
            kom.tytul= req.body.tytul,
            kom.opis= req.body.opis,
            kom.data= req.body.data,

            kom.save().then(data => {
                res.status(200).send({'ok': true})
            }).catch(err =>{
                res.status(200).send({'ok': false, error: err})
            })
        }
        else{
            let nowy = new KomentarzModel({
                idd: req.params.idd, 
                idu: idu,
                nick: req.body.nick,
                tytul: req.body.tytul,
                opis: req.body.opis,
                data: req.body.data,
                ocena: 0
            })
        
            nowy.save().then(data => {
                res.status(200).send({'ok': true})
            }).catch(err =>{
                res.status(200).send({'ok': false, error: err})
            })
        }
    })
    .catch(err =>{
        res.status(500).end()
    })

    
}

exports.delete_komentarz = (req, res) => {
    console.log("delete_komentarz");
    console.log(req.params)

    KomentarzModel.deleteOne({_id: req.params.id}).then(dane =>{
        res.status(200).send(dane)
    })
    .catch(err =>{
        res.status(404).end()
    })
}