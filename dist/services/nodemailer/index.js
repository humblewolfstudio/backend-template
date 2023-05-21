var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from 'nodemailer';
import { APIException } from 'src/types';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    }
});
export const sendVerifyEmail = (emailTo, urlToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: emailTo,
            subject: 'Email Verification eTrash',
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
                return new APIException(500, 'Error sending Verification Email');
        }
        console.error(e);
        return new APIException(500, 'Internal server error');
    }
});
//# sourceMappingURL=index.js.map