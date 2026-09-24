const { Sequelize } = require("sequelize");

const { database } = require("./env");

const sequelize = new Sequelize(
    database.name,
    database.user,
    database.password,
    {
        host: database.host,
        port: database.port,

        dialect: "mysql",

        logging: false,

        pool:{
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);



const connectDatabase = async () =>{
    try{
        await sequelize.authenticate();
        console.log("connected")
    }
    catch(error){
        console.error(" not connected 0", error);
        throw error;
    }
};


module.exports= {
    sequelize,
    connectDatabase
}
// npm i sequelize mysql2