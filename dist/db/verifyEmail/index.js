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
exports.verifyEmail = exports.generateVerifyEmail = void 0;
const types_1 = require("../../types");
const uuid = __importStar(require("uuid"));
const users_1 = require("../users");
const db_schemas_1 = require("../db.schemas");
const nodemailer_1 = require("../../services/nodemailer");
const oneWeek = 7 * 24 * 60 * 60 * 1000;
const generateVerifyEmail = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urlToken = uuid.v4();
        const maxTime = Date.now() + oneWeek;
        const userMail = yield (0, users_1.getEmail)(user_id);
        if (userMail instanceof types_1.APIException)
            throw 1;
        const emailTo = userMail.email;
        const validated = userMail.validated;
        if (validated)
            throw 2;
        const exists = yield db_schemas_1.VerifyEmailSchema.findOne({ user_id });
        if (exists && exists.maxTime > Date.now())
            throw 3;
        if (exists && exists.maxTime < Date.now())
            yield db_schemas_1.VerifyEmailSchema.deleteOne({ user_id });
        yield db_schemas_1.VerifyEmailSchema.create({ user_id, maxTime, urlToken, emailTo });
        const email = yield (0, nodemailer_1.sendVerifyEmail)(emailTo, urlToken);
        return email;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(400, 'User doesnt exist');
            case 2:
                return new types_1.APIException(400, 'Email already validated');
            case 3:
                return new types_1.APIException(400, 'Email already sent');
        }
        console.error(e);
        return new types_1.APIException(500, 'Internal server error');
    }
});
exports.generateVerifyEmail = generateVerifyEmail;
const verifyEmail = (urlToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifyEmail = yield db_schemas_1.VerifyEmailSchema.findOne({ urlToken });
        if (!verifyEmail)
            throw 1;
        if (verifyEmail.maxTime < Date.now()) {
            yield db_schemas_1.VerifyEmailSchema.deleteOne({ urlToken });
            throw 2;
        }
        yield db_schemas_1.VerifyEmailSchema.deleteOne({ urlToken });
        const validated = yield (0, users_1.validateEmail)(verifyEmail.user_id);
        return validated;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(400, 'Doesnt exist...');
            case 2:
                return new types_1.APIException(400, 'Verification Mail has already expired');
        }
        console.error(e);
        return new types_1.APIException(500, 'Internal server error');
    }
});
exports.verifyEmail = verifyEmail;
//# sourceMappingURL=index.js.map