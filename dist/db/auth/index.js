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
exports.authenticate = exports.registerUser = exports.logInUser = void 0;
const types_1 = require("../../types");
const db_schemas_1 = require("../db.schemas");
const users_1 = require("../users");
const bcrypt = __importStar(require("bcrypt"));
const uuid = __importStar(require("uuid"));
const logInUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, users_1.getUserByUsername)(username);
        if (user instanceof types_1.APIException)
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
                return new types_1.APIException(400, 'User doesnt exist');
            case 2:
                return new types_1.APIException(401, "Unauthorized");
        }
    }
    return new types_1.APIException(500, 'Internal server error');
});
exports.logInUser = logInUser;
const registerUser = (username, password, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExists = yield (0, users_1.getUserByUsername)(username);
        if (!(userExists instanceof types_1.APIException))
            throw 1;
        const emailExists = yield (0, users_1.getUserByEmail)(email);
        if (!(emailExists instanceof types_1.APIException))
            throw 2;
        const hashedPw = yield bcrypt.hash(password, 12);
        const id = uuid.v4();
        const token = uuid.v4();
        const radarDistance = 1000;
        const validated = false;
        const user = yield db_schemas_1.UserSchema.create({ id, username, email, hashedPw, token, validated, radarDistance });
        return { username, id, email, token };
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(400, 'Username already exists');
            case 2:
                return new types_1.APIException(400, 'Account with this email already exists');
        }
    }
    return new types_1.APIException(500, 'Internal server error');
});
exports.registerUser = registerUser;
const authenticate = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, users_1.getUserByToken)(token);
        if (user instanceof types_1.APIException)
            throw 1;
        return { id: user.id, username: user.username, email: user.email };
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(401, "Unauthorized");
        }
    }
    return new types_1.APIException(500, 'Internal server error');
});
exports.authenticate = authenticate;
//# sourceMappingURL=index.js.map