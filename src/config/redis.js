const { createClient } = require("redis")

const {redisUrl} = require("./env")

const redisClient = createClient({
    url: redisUrl
})

redisClient.on("error", (error) =>{
    console.error(
        " Redis error:", error
    );
});

const connectRedis = async() =>{

    if(!redisClient.isOpen){
        await redisClient.connect();
    }

    console.log("redis is connected");
    
};

module.exports = {
    redisClient,
    connectRedis
}

