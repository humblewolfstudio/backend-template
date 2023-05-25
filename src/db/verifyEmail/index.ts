import { APIException } from "../../types";
import * as uuid from 'uuid';
import { getEmail, validateEmail } from "../users";
import { VerifyEmailSchema } from "../db.schemas";
import { sendVerifyEmail } from "../../services/nodemailer";

const oneWeek = 7 * 24 * 60 * 60 * 1000;

export const generateVerifyEmail = async (user_id: string) => {
    try {
        const urlToken = uuid.v4();
        const maxTime = Date.now() + oneWeek;
        const userMail = await getEmail(user_id);

        if (userMail instanceof APIException) throw 1;

        const emailTo = userMail.email;
        const validated = userMail.validated;

        if (validated) throw 2;

        const exists = await VerifyEmailSchema.findOne({ user_id });

        if (exists && exists.maxTime > Date.now()) throw 3; //si el trobem i la data maxima es mes gran que la actual li diem que ja te un correu
        if (exists && exists.maxTime < Date.now()) await VerifyEmailSchema.deleteOne({ user_id }); //si el trobem i la data maxima es mes petita que la atual, la eliminem

        await VerifyEmailSchema.create({ user_id, maxTime, urlToken, emailTo });

        const email = await sendVerifyEmail(emailTo, urlToken);

        return email;
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
            case 2:
                return new APIException(400, 'Email already validated');
            case 3:
                return new APIException(400, 'Email already sent');
        }
        console.error(e);
        return new APIException(500, 'Internal server error');
    }
}

export const verifyEmail = async (urlToken: string) => {
    try {
        const verifyEmail = await VerifyEmailSchema.findOne({ urlToken });
        if (!verifyEmail) throw 1;

        if (verifyEmail.maxTime < Date.now()) {
            await VerifyEmailSchema.deleteOne({ urlToken });
            throw 2;
        }
        await VerifyEmailSchema.deleteOne({ urlToken });
        const validated = await validateEmail(verifyEmail.user_id);
        return validated;
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'Doesnt exist...');
            case 2:
                return new APIException(400, 'Verification link has already expired');
        }
        console.error(e);
        return new APIException(500, 'Internal server error');
    }
}