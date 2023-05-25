import { APIException } from "../../types";
import * as uuid from 'uuid';
import { getEmail, userExists } from "../users";
import { ChangePasswordSchema, UserSchema } from "../db.schemas";
import { sendChangePasswordEmail } from "src/services/nodemailer";
import * as bcrypt from 'bcrypt';

const oneWeek = 7 * 24 * 60 * 60 * 1000;

export const generateChangePassowrd = async (user_id: string) => {
    try {
        const urlToken = uuid.v4();
        const maxTime = Date.now() + oneWeek;
        const userMail = await getEmail(user_id);

        if (userMail instanceof APIException) throw 1;

        const emailTo = userMail.email;

        const exists = await ChangePasswordSchema.findOne({ user_id });

        if (exists && exists.maxTime > Date.now()) throw 2; //si el trobem i la data maxima es mes gran que la actual li diem que ja te un correu
        if (exists && exists.maxTime < Date.now()) await ChangePasswordSchema.deleteOne({ user_id }); //si el trobem i la data maxima es mes petita que la atual, la eliminem

        await ChangePasswordSchema.create({ user_id, maxTime, urlToken });

        const email = await sendChangePasswordEmail(emailTo, urlToken);

        return email;
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
            case 2:
                return new APIException(400, 'Email already sent');
        }
        console.error(e);
        return new APIException(500, 'Internal server error');
    }
}

export const changePassword = async (urlToken: string, newPassword: string) => {
    try {
        const changePassword = await ChangePasswordSchema.findOne({ urlToken });
        if (!changePassword) throw 1;

        if (Date.now() > changePassword.maxTime) throw 2;

        const id = changePassword.user_id;
        const user = await UserSchema.findOne({ id });

        if (!user) throw 3;

        user.hashedPw = await bcrypt.hash(newPassword, 12);
        user.token = uuid.v4();
        user.save();

        await ChangePasswordSchema.deleteOne({ urlToken });
        return true;
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'Cant change password, this urlToken doesnt exist');
            case 2:
                return new APIException(400, 'Change Password token has already expired');
            case 3:
                return new APIException(400, 'User doesnt exist');
        }
        console.error(e);
        return new APIException(500, 'Internal server error');
    }
}