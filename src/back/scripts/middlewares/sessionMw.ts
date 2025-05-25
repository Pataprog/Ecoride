import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

export const sessionMw = session({
    secret:process.env.SESSION_SECRET!,
    resave:false,
    rolling:true,
    saveUninitialized:false,
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URL!,
    }),
    cookie:{
        maxAge: 1000*60*30,
         httpOnly: true,
        secure: false
    }
})    
