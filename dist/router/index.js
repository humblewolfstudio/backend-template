import express from 'express';
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
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
});
const upload = multer({ storage });
router.post('/login', credentialsEndpoints, controller.login);
router.post('/register', credentialsEndpoints, controller.register);
router.get('/authenticate', controller.authenticate);
router.get('/getProfile', defaultEndpoints, controller.getProfile);
router.get('/generateVerify', credentialsEndpoints, controller.generateVerify);
router.get('/verifyEmail', controller.verifyEmail);
export default router;
//# sourceMappingURL=index.js.map