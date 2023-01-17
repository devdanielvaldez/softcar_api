import * as mongoose from 'mongoose';
import logger from 'jet-logger';

const connection = async() => {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb+srv://softcar-db-mongo-9fba3289.mongo.ondigitalocean.com", {
        user: "softrent",
        pass: "9eIF3w875rM04GE6",
        dbName: "dev"
    })
    .then((result: any) => 
        logger.info('Database connected')
    )
    .catch(err => 
        logger.err(err)
    )
}

export default connection;