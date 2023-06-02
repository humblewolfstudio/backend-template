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
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeRadarDistance = exports.validateEmail = exports.getEmail = exports.getProfile = exports.getUserByToken = exports.getUserByEmail = exports.getUserByUsername = exports.userExists = void 0;
const types_1 = require("../../types");
const db_schemas_1 = require("../db.schemas");
const userExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_schemas_1.UserSchema.findOne({ id }).select(['-_id', '-__v']);
        if (!user)
            throw 1;
        return user;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(400, 'User doesnt exist');
        }
    }
    return new types_1.APIException(500, 'Internal server error');
});
exports.userExists = userExists;
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_schemas_1.UserSchema.findOne({ username }).select(['-_id', '-__v']);
        if (!user)
            throw 1;
        return user;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(400, 'User doesnt exist');
        }
    }
    return new types_1.APIException(500, 'Internal server error');
});
exports.getUserByUsername = getUserByUsername;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_schemas_1.UserSchema.findOne({ email }).select(['-_id', '-__v']);
        if (!user)
            throw 1;
        return user;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(400, 'User doesnt exist');
        }
    }
    return new types_1.APIException(500, 'Internal server error');
});
exports.getUserByEmail = getUserByEmail;
const getUserByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_schemas_1.UserSchema.findOne({ token }).select(['-_id', '-__v']);
        if (!user)
            throw 1;
        return user;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(400, 'User doesnt exist');
        }
    }
    return new types_1.APIException(500, 'Internal server error');
});
exports.getUserByToken = getUserByToken;
const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_schemas_1.UserSchema.findOne({ id }).select(['-_id', '-__v']);
        if (!user)
            throw 1;
        return { username: user.username, email: user.email, validated: user.validated, radarDistance: user.radarDistance };
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(400, 'User doesnt exist');
        }
    }
    return new types_1.APIException(500, 'Internal server error');
});
exports.getProfile = getProfile;
const getEmail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_schemas_1.UserSchema.findOne({ id });
        if (!user)
            throw 1;
        return { email: user.email, validated: user.validated };
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(400, 'User doesnt exist');
        }
        return new types_1.APIException(500, 'Internal server error');
    }
});
exports.getEmail = getEmail;
const validateEmail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_schemas_1.UserSchema.findOne({ id });
        if (!user)
            throw 1;
        user.validated = true;
        yield user.save();
        return true;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(400, 'User doesnt exist');
        }
        console.error(e);
        return new types_1.APIException(500, 'Internal server error');
    }
});
exports.validateEmail = validateEmail;
const changeRadarDistance = (id, radarDistance) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_schemas_1.UserSchema.findOne({ id });
        if (!user)
            throw 1;
        user.radarDistance = radarDistance;
        yield user.save();
        return true;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(400, 'User doesnt exist');
        }
        console.error(e);
        return new types_1.APIException(500, 'Internal server error');
    }
});
exports.changeRadarDistance = changeRadarDistance;
//# sourceMappingURL=index.js.map