const ZamowienieModel = require('../models/zamowienie')

exports.get_zamowienia = (req, res) => {
    console.log("get_zamowienia");
    console.log(req.params)

    ZamowienieModel.find({idu: req.params.idu}).then(zam => {
         res.status(200).send(zam)
    })
}

exports.post_zamowienie = (req, res) => {
    console.log("post_zamowienie");
    console.log(req.params)
    console.log(req.body)

    if (req.params.idu != req.body.idu)
    {
        res.rendStatus(403)
        return
    }
    
    let nowy = new ZamowienieModel(req.body)

    nowy.save().then(data => {
        res.status(200).send({'ok': true})
    }).catch(err =>{
        res.status(200).send({'ok': false})
    })
}


exports.get_zamowienie = (req, res) => {
    console.log("get_zamowienie");
    console.log(req.params)
    // TODO
    res.sendStaus(404)
}
exports.delete_zamowienie = (req, res) => {
    console.log("delete_zamowienie");
    console.log(req.params)
    // TODO
    res.sendStaus(404)
}