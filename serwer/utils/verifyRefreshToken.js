const UserToken = require("../models/userToken.js");
const jwt = require ('jsonwebtoken');
const config = require("./../config/serwer_config")

exports.verifyRefreshToken = (refreshToken) => {
    const privateKey = config.accessTokenSecret;

    return new Promise((resolve, reject) => {
        UserToken.findOne({ token: refreshToken }, (err, doc) => {
            if (!doc)
                return reject({ ok: false, error: true, message: "Invalid refresh token" });

            jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
                if (err)
                    return reject({ ok: false, error: true, message: "Invalid refresh token" });
                resolve({
                    tokenDetails,
                    ok: true,
                    error: false,
                    message: "Valid refresh token",
                });
            });
        });
    });
};
