import express from "express";
import morgan from "morgan";
import cors from 'cors';
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import router from "./router";
dotenv.config();
const app = express();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
    console.log("Connected to the DB");
}).catch((e) => {
    console.error(e);
});
app.set('port', 3101);
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/api', router);
const server = app.listen(app.get('port'), () => {
    console.log('Server started on http://localhost:' + app.get('port'));
});
//# sourceMappingURL=index.js.map