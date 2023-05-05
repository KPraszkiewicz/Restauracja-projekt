const jwt = require ('jsonwebtoken');
const UserToken = require("../models/userToken.js");
const config = require("./../config/serwer_config")

exports.generateTokens = async (user) => {
    try {
        const payload = { _id: user._id, role: user.role };
        const accessToken = jwt.sign(
            payload,
            config.accessTokenSecret,
            { expiresIn: config.tokenLife }
        );
        const refreshToken = jwt.sign(
            payload,
            config.accessTokenSecret,
            { expiresIn: config.refreshTokenLife }
        );

        const userToken = await UserToken.findOne({ userId: user._id });
        if (userToken) await userToken.remove();

        await new UserToken({ userId: user._id, token: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};
