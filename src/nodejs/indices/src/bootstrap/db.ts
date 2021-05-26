/**
 * Mongodb connection module.
 */

 import mongoose from 'mongoose';

 type TInput = {
     db: string;
 }
 
 export default ({db}: TInput) => {
     /**
      * Connect to MongoDB.
      */
     const connect = () => {
         mongoose.connect(db,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
             .then(() => {
                 // tslint:disable-next-line:no-console
                 return console.info('connected to db');
             })
             .catch(error => {
                 // tslint:disable-next-line:no-console
                 console.error(`error connecting to database: ${error}`);
                 return process.exit(1);
             })
         ;
     };
     connect();
     mongoose.connection.on('disconnected', connect);
 };
 