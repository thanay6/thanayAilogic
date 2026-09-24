const { User } = require("../models");

const { hashPassword, comparePassword } = require("../utils/passwordUtills");

const { verifyAccessToken, generateAcessToken } = require("../utils/jwt");

const register = async ({
    name, phoneNumber, password
}) => {
    const existinguser = await User.findOne({
        where: {
            phoneNumber
        }
    })

    if (existinguser) {
        const error = new Error("user already exists");
        error.statusCode = 409;
        throw error;
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
        name, phoneNumber, password: passwordHash
    });

    return {
        id: user.id,
        name: user.name,
    }
}

const login = async ({
    email, password
}) => {

    const user = await User.findOne({
        where: { phoneNumber }
    })

    if (!user) {
        const error = new Error("Invalid credintials");
        error.statusCode = 401;
        throw error;

    }


    const isPasswordValid = await comparePassword(password, user.password);

    if(!isPasswordValid){
         const error = new Error("Invalid credintials");
        error.statusCode = 401;
        throw error;
    }

    const accessToken = generateAcessToken(user)

    return { accessToken,
        user
    };
};

module.exports = {
    register,login
}