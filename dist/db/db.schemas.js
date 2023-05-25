"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordSchema = exports.VerifyEmailSchema = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    hashedPw: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    validated: {
        type: Boolean,
        required: true
    },
    radarDistance: {
        type: String,
        required: true
    }
});
const verifyEmailSchema = new mongoose_1.Schema({
    emailTo: {
        type: String,
        required: true
    },
    urlToken: {
        type: String,
        required: true
    },
    maxTime: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});
const changePasswordSchema = new mongoose_1.Schema({
    urlToken: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    maxTime: {
        type: Number,
        required: true
    }
});
exports.UserSchema = (0, mongoose_1.model)("User", userSchema, "Usuarios");
exports.VerifyEmailSchema = (0, mongoose_1.model)('VerifyEmail', verifyEmailSchema, 'Verify Emails');
exports.ChangePasswordSchema = (0, mongoose_1.model)('ChangePassword', changePasswordSchema, 'Change Passwords');
//# sourceMappingURL=db.schemas.js.map