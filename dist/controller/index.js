"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../db/users");
const types_1 = require("../types");
const auth_1 = require("../db/auth");
const verifyEmail_1 = require("../db/verifyEmail");
const changePassword_1 = require("../db/changePassword");
const controller = {};
controller.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = String(req.body.username);
    const password = String(req.body.password);
    const login = yield (0, auth_1.logInUser)(username, password);
    if (login instanceof types_1.APIException)
        return res.status(login.status).send(login.message);
    return res.status(200).json(login);
});
controller.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = String(req.body.username);
    const password = String(req.body.password);
    const email = String(req.body.email);
    const register = yield (0, auth_1.registerUser)(username, password, email);
    if (register instanceof types_1.APIException)
        return res.status(register.status).send(register.message);
    return res.status(200).json(register);
});
controller.authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token ? String(req.query.token) : '';
    if (token === '')
        return res.status(400).send('Token is required');
    const auth = yield (0, auth_1.authenticate)(token);
    if (auth instanceof types_1.APIException)
        return res.status(auth.status).send(auth.message);
    return res.status(200).json(auth);
});
controller.getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token ? String(req.query.token) : '';
    if (token === '')
        return res.status(400).send('Token is required');
    const auth = yield (0, auth_1.authenticate)(token);
    if (auth instanceof types_1.APIException)
        return res.status(auth.status).send(auth.message);
    const profile = yield (0, users_1.getProfile)(auth.id);
    if (profile instanceof types_1.APIException)
        return res.status(profile.status).send(profile.message);
    return res.status(200).json(profile);
});
controller.generateVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token ? String(req.query.token) : '';
    if (token === '')
        return res.status(400).send('Token is required');
    const auth = yield (0, auth_1.authenticate)(token);
    if (auth instanceof types_1.APIException)
        return res.status(auth.status).send(auth.message);
    const email = yield (0, verifyEmail_1.generateVerifyEmail)(auth.id);
    if (email instanceof types_1.APIException)
        return res.status(email.status).send(email.message);
    return res.status(200).send(email);
});
controller.verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const urlToken = req.query.urlToken ? String(req.query.urlToken) : '';
    if (urlToken === '')
        return res.status(400).send('urlToken is required');
    const verified = yield (0, verifyEmail_1.verifyEmail)(urlToken);
    if (verified instanceof types_1.APIException)
        return res.status(verified.status).send(verified.message);
    return res.status(200).send(verified);
});
controller.generateChangePassowrd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token ? String(req.headers.token) : '';
    if (token === '')
        return res.status(400).send('Token is required');
    const auth = yield (0, auth_1.authenticate)(token);
    if (auth instanceof types_1.APIException)
        return res.status(auth.status).send(auth.message);
    const email = yield (0, changePassword_1.generateChangePassowrd)(auth.id);
    if (email instanceof types_1.APIException)
        return res.status(email.status).send(email.message);
    return res.status(200).send(email);
});
controller.changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const urlToken = req.headers.urlToken ? String(req.headers.urlToken) : '';
    const newPassword = req.body.newPassword ? String(req.body.newPassword) : '';
    if (urlToken === '')
        return res.status(400).send('urlToken is required');
    const changed = yield (0, changePassword_1.changePassword)(urlToken, newPassword);
    if (changed instanceof types_1.APIException)
        return res.status(changed.status).send(changed.message);
    return res.status(200).send(true);
});
exports.default = controller;
//# sourceMappingURL=index.js.map