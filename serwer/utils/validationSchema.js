const crypto = require('crypto');
const Joi = require('joi')

exports.signUpBodyValidation = (body) => {
    //npm install joi
    const schema = Joi.object({
        login: Joi.string().required().label("nazwa"),
        haslo: Joi.string().required().label("haslo"),
    });
    return schema.validate(body);

    // if(body.login && body.haslo)
    //     return true
    // return false
};


exports.logInBodyValidation = (body) => {
    const schema = Joi.object({
        login: Joi.string().required().label("nazwa"),
        haslo: Joi.string().required().label("haslo"),
    });
    return schema.validate(body);

    // if(body.login && body.haslo)
    //     return true
    // return false
};

exports.refreshTokenBodyValidation = (body) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required().label("Refresh Token"),
    });
    return schema.validate(body);

    // if(body.refreshToken)
    //     return true
    // return false
};
