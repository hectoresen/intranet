const mongoose = require('mongoose');

const DB_URL = "mongodb://localhost:27017/intranet";
const CONFIG_DB = {useNewUrlParser: true, useUnifiedTopology: true};

const connectToDb = async () =>{
    try{
        const response = await mongoose.connect(DB_URL, CONFIG_DB);
        const {host, port, name} = response.connection;
        console.log(`Connected to ${name} in ${host}:${port}`);
    }catch (error){
        console.error(error);
    }
}

module.exports = {DB_URL, CONFIG_DB, connectToDb,}