"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller_1 = __importDefault(require("../controller"));
const express_slow_down_1 = __importDefault(require("express-slow-down"));
const multer_1 = __importDefault(require("multer"));
const defaultEndpoints = (0, express_slow_down_1.default)({
    windowMs: 15 * 60 * 1000,
    delayAfter: 100,
    delayMs: 100
});
const credentialsEndpoints = (0, express_slow_down_1.default)({
    windowMs: 15 * 60 * 1000,
    delayAfter: 5,
    delayMs: 100
});
const uploadEndpoints = (0, express_slow_down_1.default)({
    windowMs: 15 * 60 * 1000,
    delayAfter: 10,
    delayMs: 100
});
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
});
const upload = (0, multer_1.default)({ storage });
router.post('/login', credentialsEndpoints, controller_1.default.login);
router.post('/register', credentialsEndpoints, controller_1.default.register);
router.get('/authenticate', controller_1.default.authenticate);
router.get('/getProfile', defaultEndpoints, controller_1.default.getProfile);
router.get('/generateVerify', credentialsEndpoints, controller_1.default.generateVerify);
router.get('/verifyEmail', controller_1.default.verifyEmail);
exports.default = router;
//# sourceMappingURL=index.js.map