const authservices = require("../services/authservice");

const { incrementLoginAttempts, clearLoginAttempts } = require("../middlewares/ratelimit")

const register = async (req, res, next) => {
    try {
        const user = await authservices.register(
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "registered0",
            data: user
        });


    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {

        const result = await authservices.login(req.body)

        await clearLoginAttempts(req.rateLimitKey);

        return res.status(200).json({
            success: true,
            message: "login sucess",
            data: result
        });

    } catch (error) {
        if (error.statusCode === 401) {
            await incrementLoginAttempts(req.rateLimitKey);
        }
        next(error);
    }
}

module.exports = {
    register, login
}