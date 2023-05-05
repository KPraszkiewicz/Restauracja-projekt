const jwt = require ('jsonwebtoken');
const config = require("./../config/serwer_config")

const accessTokenSecret = config.accessTokenSecret;

exports.jwt_ogolny = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("JWT_ogolny")
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(401).json({
                    ok:true,
                    tokenExp: true,
                    error: false,
                    message: "Niepoprawny token"
                });
            }
            console.log(user)
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

exports.jwt_ogolny_user = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("JWT_ogolny")
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(401).json({
                    ok:true,
                    tokenExp: true,
                    error: false,
                    message: "Niepoprawny token"
                });
            }
            if(req.params.idu != user._id)
            {
                return res.status(403).json({
                    ok:true,
                    tokenExp: true,
                    error: false,
                    message: "Niepoprawny user id"
                });
            }
            console.log(user)
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

exports.jwt_admin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("JWT_admin")
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, token) => {
            if (err) {
                return res.status(401).json({
                    ok:true,
                    tokenExp: true,
                    error: false,
                    message: "Niepoprawny token"
                });
            }
            console.log(token)
            if(!token.role.includes("admin"))
            {
                return res.status(403).json({
                    ok:true,
                    tokenExp: false,
                    error: false,
                    message: "Brak uprawnień"
                });
            }
            req.user = token.userId;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
