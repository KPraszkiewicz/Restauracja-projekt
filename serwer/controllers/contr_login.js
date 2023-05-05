const jwt = require ('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const vs = require("../utils/validationSchema")
const gt = require("../utils/generateTokens")

const config = require("./../config/serwer_config")
const UserModel = require('../models/user')

const accessTokenSecret = config.accessTokenSecret;

exports.login = async (req, res) => {
    console.log("login")
    // const login = req.body.login
    // const haslo = crypto.createHash('sha256').update(req.body.haslo).digest('base64');

    // //console.log(login, haslo)
    // let user = await UserModel.findOne({nazwa: login, haslo: haslo})
    
    // if (user) {

    //     const jwtBearerToken = jwt.sign({ userId: user._id, role: user.role}, accessTokenSecret, {
    //         expiresIn: 1200,
    //     })
    //     const jwtBearerTokenRef = jwt.sign({ userId: user._id, role: user.role}, accessTokenSecret, {
    //         expiresIn: config.refreshTokenLife,
    //     })
    //     // send the JWT back to the user
    //     // TODO - multiple options available      

    //     refreshTokens.push(jwtBearerTokenRef);

    //     // #1 set it in an HTTP Only + Secure Cookie
    //     //res.cookie("SESSIONID", jwtBearerToken, { httpOnly: true, secure: true });

    //     //#2 
    //     // set it in the HTTP Response body
    //     res.status(200).json({
    //         token: jwtBearerToken,
    //         tokenRef: jwtBearerTokenRef,
    //         userId: user._id,
    //         role: user.role,
    //         expiresIn: 1200,
    //         ok:true
    //     });
    // }
    // else {
    //     // send status 401 Unauthorized
    //     res.sendStatus(401);
    // }
//////////////////////////////////////////////////
    try {
        const { error } = vs.logInBodyValidation(req.body);
        if (error)
            return res
                .status(400)
                .json({ ok:false, error: true, message: error.details[0].message });

        const user = await UserModel.findOne({ nazwa: req.body.login });
        if (!user)
            return res
                .status(401)
                .json({ok:false, error: true, message: "Invalid login or password" });

        const verifiedPassword = await bcrypt.compare(
            req.body.haslo,
            user.haslo
        );
        if (!verifiedPassword)
            return res
                .status(401)
                .json({ok:false, error: true, message: "Invalid login or password" });

        const { accessToken, refreshToken } = await gt.generateTokens(user);

        res.status(200).json({
            ok:true,
            error: false,
            accessToken,
            refreshToken,
            user: user,
            expiresIn: config.tokenLife, // test
            message: "Logged in sucessfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ok:false, error: true, message: "Internal Server Error" });
    }

}