const { redisClient } = require("../config/redis")

const loginRatelimit = async (req, res, next) => {
    try {
        const phoneNumber = req.body.phoneNumber;
        const ip = req.ip;
        if (!phoneNumber) {
            return next();
        }

        const key = `loginAttempt:${ip}:${phoneNumber}`;

        const attempts = await redisClient.get(key);

        const Max_attempts = 5;

        if (attempts && Number(attempts) > Max_attempts) {
            return res.status(429).json({
                sucess: false,
                message: "too many attempts"
            });
        }

        req.rateLimitKey = key;

        next();
    }
    catch (error) {
        next(error);
    }


}

const incrementLoginAttempts = async (key) => {
    if (!key) {
        return;
    }

    const attempts = await redisClient.incr(key);

    if (attempts === 1) {
        await redisClient.expire(
            key, 15 * 60
        )

    }

    return attempts;
};

const clearLoginAttempts = async (key) => {

    if (!key) {
        return;
    }

    await redisClient, del(key);
};

module.exports = {
    incrementLoginAttempts,
    clearLoginAttempts,
    loginRatelimit
}