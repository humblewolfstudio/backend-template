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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendChangePasswordEmail = exports.sendVerifyEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const types_1 = require("../../types");
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    }
});
const sendVerifyEmail = (emailTo, urlToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: emailTo,
            subject: 'Email Verification Trash&Go',
            html: `<p>Click <a href="https://trashandgo.vercel.app/api/verifyEmail?t=${urlToken}">here</a> to verify your email</p>`
        };
        return transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                throw 1;
            }
            else {
                return true;
            }
        });
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(500, 'Error sending Verification Email');
        }
        console.error(e);
        return new types_1.APIException(500, 'Internal server error');
    }
});
exports.sendVerifyEmail = sendVerifyEmail;
const sendChangePasswordEmail = (emailTo, urlToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: emailTo,
            subject: 'Change Password Trash&Go',
            html: `<p>Click <a href="https://trashandgo.vercel.app/api/changePassword?t=${urlToken}">here</a> to change your password</p>`
        };
        return transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                throw 1;
            }
            else {
                return true;
            }
        });
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(500, 'Error sending Verification Email');
        }
        console.error(e);
        return new types_1.APIException(500, 'Internal server error');
    }
});
exports.sendChangePasswordEmail = sendChangePasswordEmail;
//# sourceMappingURL=index.js.map