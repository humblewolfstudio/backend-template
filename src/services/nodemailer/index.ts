import nodemailer from 'nodemailer';
import { APIException } from 'src/types';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

export const sendVerifyEmail = async (emailTo: string, urlToken: string) => {
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
            } else {
                return true;
            }
        });
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(500, 'Error sending Verification Email');
        }
        console.error(e);
        return new APIException(500, 'Internal server error');
    }
}