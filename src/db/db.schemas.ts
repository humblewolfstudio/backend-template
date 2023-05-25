import { Schema, model } from "mongoose";
import { IChangePassword, IUser, IVerifyEmail } from "../types";

const userSchema = new Schema<IUser>({
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

const verifyEmailSchema = new Schema<IVerifyEmail>({
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

const changePasswordSchema = new Schema<IChangePassword>({
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

export const UserSchema = model<IUser>("User", userSchema, "Usuarios");
export const VerifyEmailSchema = model<IVerifyEmail>('VerifyEmail', verifyEmailSchema, 'Verify Emails');
export const ChangePasswordSchema = model<IChangePassword>('ChangePassword', changePasswordSchema, 'Change Passwords');