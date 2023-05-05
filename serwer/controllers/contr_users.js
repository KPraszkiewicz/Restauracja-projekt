const UserModel = require('../models/user')
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const vs = require("../utils/validationSchema.js")

exports.get_users = (req, res) => {
    console.log("get_users");

    UserModel.find().then(u => {
        res.status(200).send(u)
    })
}

exports.get_user = (req, res) => {
    console.log("get_user");
    console.log(req.params)

    UserModel.findOne({_id : req.params.id}).then(u =>{
        res.status(200).send(u)
    })
    .catch(err =>{
        res.status(404).end()
    })
}

exports.post_user = async (req, res) => {
    console.log("post_user");
    console.log(req.body)

    // const login = req.body.login
    // const haslo = crypto.createHash('sha256').update(req.body.haslo).digest('base64');

    // let nowy = new UserModel()
    // nowy.nazwa = login
    // nowy.haslo = haslo
    // nowy.role = []

    // nowy.save().then(data => {
    //     res.status(200).send({'ok': true})
    // }).catch(err =>{
    //     res.status(200).send({'ok': false})
    // })

    try {
        const { error } = vs.signUpBodyValidation(req.body);
        if (error)
            return res
                .status(400)
                .json({ ok: false, error: true, message: error.details[0].message });

        const user = await UserModel.findOne({ nazwa: req.body.login });
        if (user)
            return res
                .status(400)
                .json({ ok: false, error: true, message: "User with given login already exist" });

        const salt = await bcrypt.genSalt(Number(10));
        const hashPassword = await bcrypt.hash(req.body.haslo, salt);

        await new UserModel({ nazwa: req.body.login, haslo: hashPassword, role:[] }).save();

        res
            .status(201)
            .json({ ok: true, error: false, message: "Account created sucessfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false, error: true, message: "Internal Server Error" });
    }
}

exports.delete_user = (req, res) => {
    console.log("delete_user");
    console.log(req.params)

    UserModel.deleteOne({_id: req.params.id}).then(dane =>{
        res.status(200).send(dane)
    })
    .catch(err =>{
        res.status(404).end()
    })
}