var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { APIException } from "src/types";
import * as uuid from 'uuid';
import { getEmail, validateEmail } from "../users";
import { VerifyEmailSchema } from "../db.schemas";
import { sendVerifyEmail } from "src/services/nodemailer";
const oneWeek = 7 * 24 * 60 * 60 * 1000;
export const generateVerifyEmail = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urlToken = uuid.v4();
        const maxTime = Date.now() + oneWeek;
        const userMail = yield getEmail(user_id);
        if (userMail instanceof APIException)
            throw 1;
        const emailTo = userMail.email;
        const validated = userMail.validated;
        if (validated)
            throw 2;
        const exists = yield VerifyEmailSchema.findOne({ user_id });
        if (exists && exists.maxTime > Date.now())
            throw 3;
        if (exists && exists.maxTime < Date.now())
            yield VerifyEmailSchema.deleteOne({ user_id });
        yield VerifyEmailSchema.create({ user_id, maxTime, urlToken, emailTo });
        const email = yield sendVerifyEmail(emailTo, urlToken);
        return email;
    }
    catch (e) {
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
});
export const verifyEmail = (urlToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifyEmail = yield VerifyEmailSchema.findOne({ urlToken });
        if (!verifyEmail)
            throw 1;
        if (verifyEmail.maxTime < Date.now()) {
            yield VerifyEmailSchema.deleteOne({ urlToken });
            throw 2;
        }
        yield VerifyEmailSchema.deleteOne({ urlToken });
        const validated = yield validateEmail(verifyEmail.user_id);
        return validated;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'Doesnt exist...');
            case 2:
                return new APIException(400, 'Verification Mail has already expired');
        }
        console.error(e);
        return new APIException(500, 'Internal server error');
    }
});
//# sourceMappingURL=index.js.map