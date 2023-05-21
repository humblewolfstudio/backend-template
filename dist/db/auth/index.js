var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { APIException } from "../../types";
import { UserSchema } from "../db.schemas";
import { getUserByEmail, getUserByToken, getUserByUsername } from "../users";
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
export const logInUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield getUserByUsername(username);
        if (user instanceof APIException)
            throw 1;
        const matchPassword = yield bcrypt.compare(password, user.hashedPw);
        if (matchPassword) {
            return { id: user.id, token: user.token, username: user.username };
        }
        else {
            throw 2;
        }
    }
    catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
            case 2:
                return new APIException(401, "Unauthorized");
        }
    }
    return new APIException(500, 'Internal server error');
});
export const registerUser = (username, password, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExists = yield getUserByUsername(username);
        if (!(userExists instanceof APIException))
            throw 1;
        const emailExists = yield getUserByEmail(email);
        if (!(emailExists instanceof APIException))
            throw 2;
        const hashedPw = yield bcrypt.hash(password, 12);
        const id = uuid.v4();
        const token = uuid.v4();
        const radarDistance = 1000;
        const validated = false;
        const user = yield UserSchema.create({ id, username, email, hashedPw, token, validated, radarDistance });
        return { username, id, email, token };
    }
    catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'Username already exists');
            case 2:
                return new APIException(400, 'Account with this email already exists');
        }
    }
    return new APIException(500, 'Internal server error');
});
export const authenticate = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield getUserByToken(token);
        if (user instanceof APIException)
            throw 1;
        return { id: user.id, username: user.username, email: user.email };
    }
    catch (e) {
        switch (e) {
            case 1:
                return new APIException(401, "Unauthorized");
        }
    }
    return new APIException(500, 'Internal server error');
});
//# sourceMappingURL=index.js.map