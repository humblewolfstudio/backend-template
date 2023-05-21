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
export const userExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserSchema.findOne({ id }).select(['-_id', '-__v']);
        if (!user)
            throw 1;
        return user;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
    }
    return new APIException(500, 'Internal server error');
});
export const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserSchema.findOne({ username }).select(['-_id', '-__v']);
        if (!user)
            throw 1;
        return user;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
    }
    return new APIException(500, 'Internal server error');
});
export const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserSchema.findOne({ email }).select(['-_id', '-__v']);
        if (!user)
            throw 1;
        return user;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
    }
    return new APIException(500, 'Internal server error');
});
export const getUserByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserSchema.findOne({ token }).select(['-_id', '-__v']);
        if (!user)
            throw 1;
        return user;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
    }
    return new APIException(500, 'Internal server error');
});
export const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserSchema.findOne({ id }).select(['-_id', '-__v']);
        if (!user)
            throw 1;
        return { username: user.username, email: user.email, validated: user.validated, radarDistance: user.radarDistance };
    }
    catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
    }
    return new APIException(500, 'Internal server error');
});
export const getEmail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserSchema.findOne({ id });
        if (!user)
            throw 1;
        return { email: user.email, validated: user.validated };
    }
    catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
        return new APIException(500, 'Internal server error');
    }
});
export const validateEmail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserSchema.findOne({ id });
        if (!user)
            throw 1;
        user.validated = true;
        yield user.save();
        return true;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
        console.error(e);
        return new APIException(500, 'Internal server error');
    }
});
//# sourceMappingURL=index.js.map