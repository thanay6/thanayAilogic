const jwt = require("jsonwebtoken");

const {jwt: jwtConfig} = require("../config/env")

const generateAcessToken = (user) =>{


    return jwt.sign(
        {
            userId: user.id,
            phoneNumber: user.phoneNumber
        },

        jwtConfig.accessSecret,
        {
            expiresIn:'7h'
        }
    );
};

const verifyAccessToken = (token) =>{

    return jwt.verify(
        token,
        jwtConfig.accessSecret
    );
};

module.exports= {
    generateAcessToken,
    verifyAccessToken
}