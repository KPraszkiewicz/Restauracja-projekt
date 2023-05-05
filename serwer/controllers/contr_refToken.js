const jwt = require('jsonwebtoken');
const vs = require("../utils/validationSchema")
const vrt = require("../utils/verifyRefreshToken")
const config = require("./../config/serwer_config")

exports.post_refToken = async (req, res) => {
    console.log("post_refToken")
    const { error } = vs.refreshTokenBodyValidation(req.body);
    if (error)
        return res
            .status(400)
            .json({ ok: false, error: true, message: error.details[0].message });

    vrt.verifyRefreshToken(req.body.refreshToken)
        .then(({ tokenDetails }) => {
            const payload = { _id: tokenDetails._id, role: tokenDetails.role};
            const accessToken = jwt.sign(
                payload,
                config.accessTokenSecret,
                { expiresIn: config.tokenLife }
            );
            res.status(200).json({
                ok:true,
                error: false,
                accessToken,
                message: "Access token created successfully",
            });
        })
        .catch((err) => res.status(400).json(err));
}

exports.delete_refToken = async (req, res) => {
    console.log("delete_refToken")
    try {
        const { error } = vs.refreshTokenBodyValidation(req.body);
        if (error)
            return res
                .status(400)
                .json({ok:false, error: true, message: error.details[0].message });

        const userToken = await UserToken.findOne({ token: req.body.refreshToken });
        if (!userToken)
            return res
                .status(200)
                .json({ ok:true,error: false, message: "Logged Out Sucessfully" });

        await userToken.remove();
        res.status(200).json({ ok:true,error: false, message: "Logged Out Sucessfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok:false,error: true, message: "Internal Server Error" });
    }
}