import express from 'express';
import { Request } from 'express';
const router = express.Router();
import controller from '../controller';
import slowDown from 'express-slow-down';
import multer from 'multer';

const defaultEndpoints = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 100,
    delayMs: 100
});

const credentialsEndpoints = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 5,
    delayMs: 100
});

const uploadEndpoints = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 10,
    delayMs: 100
});

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, __dirname + '/../public/uploads/');
    },
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
})

const upload = multer({ storage });

//AUTHENTICATION
router.post('/login', credentialsEndpoints, controller.login);
router.post('/register', credentialsEndpoints, controller.register);
router.get('/authenticate', controller.authenticate);

//PROFILE
router.get('/getProfile', defaultEndpoints, controller.getProfile);
router.get('/generateVerify', credentialsEndpoints, controller.generateVerify);
router.get('/verifyEmail', controller.verifyEmail);
router.get('/generateChangePassowrd', credentialsEndpoints, controller.generateChangePassowrd);
router.post('/changePassword', controller.changePassword);

export default router;