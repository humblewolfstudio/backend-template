import { Schema, model } from "mongoose";
import { IChangePassword, IImage, INotification, ITrash, IUser, IVerifyEmail } from "../types";

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
        type: Number,
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

const imageSchema = new Schema<IImage>({
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

const trashSchema = new Schema<ITrash>({
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
})

const notificationSchema = new Schema<INotification>({
    id: {
        type: String,
        required: true
    },
    notification_token: {
        type: String,
        required: true
    }
})

trashSchema.index({ location: "2dsphere" });

export const UserSchema = model<IUser>("User", userSchema, "Usuarios");
export const VerifyEmailSchema = model<IVerifyEmail>('VerifyEmail', verifyEmailSchema, 'Verify Emails');
export const ChangePasswordSchema = model<IChangePassword>('ChangePassword', changePasswordSchema, 'Change Passwords');
export const ImageSchema = model<IImage>('Image', imageSchema, 'Images');
export const TrashSchema = model<ITrash>('Trash', trashSchema, 'Trash');
export const NotificationSchema = model<INotification>('Notification', notificationSchema, 'Notifications');