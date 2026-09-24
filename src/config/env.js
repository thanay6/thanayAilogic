require("dotenv").config();

module.exports = {

    port : process.env.PORT || 3002,

    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.PASSWORD || "Root@123"
    },

    redisUrl : process.env.REDIS_URL,

    jwt: {
        accessSecret : "oifjelfdnglkfdngbndlkbnlk"
    }
}