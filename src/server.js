const app = require("./app");

const { port} = require("./config/env");

const {
    connectDatabase,
    sequelize
} = require("./config/database");
const {connectRedis} = require("./config/redis");

const startServer = async() => {

    try{
        await connectDatabase()

        await sequelize.sync({
            alter: true
        });
        // await connectRedis();

        app.listen(port, 
            () => {
                console.log(`server rinning on port ${port}`);
                
            }
        );
    }catch(error) {
        console.error(
            "server failed", error

        );

        process.exit(1);
    }
};

startServer();