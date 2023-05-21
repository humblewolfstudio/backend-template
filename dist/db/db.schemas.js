import { Schema, model } from "mongoose";
const userSchema = new Schema({
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
const verifyEmailSchema = new Schema({
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
export const UserSchema = model("User", userSchema, "Usuarios");
export const VerifyEmailSchema = model('VerifyEmail', verifyEmailSchema, 'Verify Emails');
//# sourceMappingURL=db.schemas.js.map