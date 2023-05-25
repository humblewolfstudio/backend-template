"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.changePassword = exports.generateChangePassowrd = void 0;
const types_1 = require("../../types");
const uuid = __importStar(require("uuid"));
const users_1 = require("../users");
const db_schemas_1 = require("../db.schemas");
const nodemailer_1 = require("../../services/nodemailer");
const bcrypt = __importStar(require("bcrypt"));
const oneWeek = 7 * 24 * 60 * 60 * 1000;
const generateChangePassowrd = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urlToken = uuid.v4();
        const maxTime = Date.now() + oneWeek;
        const userMail = yield (0, users_1.getEmail)(user_id);
        if (userMail instanceof types_1.APIException)
            throw 1;
        const emailTo = userMail.email;
        const exists = yield db_schemas_1.ChangePasswordSchema.findOne({ user_id });
        if (exists && exists.maxTime > Date.now())
            throw 2;
        if (exists && exists.maxTime < Date.now())
            yield db_schemas_1.ChangePasswordSchema.deleteOne({ user_id });
        yield db_schemas_1.ChangePasswordSchema.create({ user_id, maxTime, urlToken });
        const email = yield (0, nodemailer_1.sendChangePasswordEmail)(emailTo, urlToken);
        return email;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(400, 'User doesnt exist');
            case 2:
                return new types_1.APIException(400, 'Email already sent');
        }
        console.error(e);
        return new types_1.APIException(500, 'Internal server error');
    }
});
exports.generateChangePassowrd = generateChangePassowrd;
const changePassword = (urlToken, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const changePassword = yield db_schemas_1.ChangePasswordSchema.findOne({ urlToken });
        if (!changePassword)
            throw 1;
        if (Date.now() > changePassword.maxTime)
            throw 2;
        const id = changePassword.user_id;
        const user = yield db_schemas_1.UserSchema.findOne({ id });
        if (!user)
            throw 3;
        user.hashedPw = yield bcrypt.hash(newPassword, 12);
        user.token = uuid.v4();
        user.save();
        yield db_schemas_1.ChangePasswordSchema.deleteOne({ urlToken });
        return true;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(400, 'Cant change password, this urlToken doesnt exist');
            case 2:
                return new types_1.APIException(400, 'Change Password token has already expired');
            case 3:
                return new types_1.APIException(400, 'User doesnt exist');
        }
        console.error(e);
        return new types_1.APIException(500, 'Internal server error');
    }
});
exports.changePassword = changePassword;
//# sourceMappingURL=index.js.map