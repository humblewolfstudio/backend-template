import express from 'express';
const router = express.Router();
import controller from '../controller';
import slowDown from 'express-slow-down';

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

//NOTIFICATIONS
router.post('/addNotificationToken', credentialsEndpoints, controller.addNotificationToken);

export default router;