"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = exports.TrashSchema = exports.ImageSchema = exports.ChangePasswordSchema = exports.VerifyEmailSchema = exports.UserSchema = void 0;
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
        type: Number,
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
const imageSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true
    },
    expiration: {
        type: Number,
        required: true
    },
    fileName: {
        type: String,
        required: true
    }
});
const trashSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true
    },
    expiration: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    tags: {
        type: String
    },
    desc: {
        type: String
    },
    image_id: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    }
});
const notificationSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true
    },
    notification_token: {
        type: String,
        required: true
    }
});
trashSchema.index({ location: "2dsphere" });
exports.UserSchema = (0, mongoose_1.model)("User", userSchema, "Usuarios");
exports.VerifyEmailSchema = (0, mongoose_1.model)('VerifyEmail', verifyEmailSchema, 'Verify Emails');
exports.ChangePasswordSchema = (0, mongoose_1.model)('ChangePassword', changePasswordSchema, 'Change Passwords');
exports.ImageSchema = (0, mongoose_1.model)('Image', imageSchema, 'Images');
exports.TrashSchema = (0, mongoose_1.model)('Trash', trashSchema, 'Trash');
exports.NotificationSchema = (0, mongoose_1.model)('Notification', notificationSchema, 'Notifications');
//# sourceMappingURL=db.schemas.js.map