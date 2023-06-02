import { APIException, IUser } from "../../types";
import { NotificationSchema, UserSchema } from "../db.schemas"

type ProfileData = {
    username: string,
    email: string,
    validated: boolean,
    radarDistance: Number
}

type EmailData = {
    email: string,
    validated: boolean
}

export const userExists = async (id: string): Promise<IUser | APIException> => {
    try {
        const user = await UserSchema.findOne({ id }).select(['-_id', '-__v']);
        if (!user) throw 1;
        return user;
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
    }
    return new APIException(500, 'Internal server error');
}

export const getUserByUsername = async (username: string): Promise<IUser | APIException> => {
    try {
        const user = await UserSchema.findOne({ username }).select(['-_id', '-__v']);
        if (!user) throw 1;
        return user;
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
    }
    return new APIException(500, 'Internal server error');
}

export const getUserByEmail = async (email: string): Promise<IUser | APIException> => {
    try {
        const user = await UserSchema.findOne({ email }).select(['-_id', '-__v']);
        if (!user) throw 1;
        return user;
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
    }
    return new APIException(500, 'Internal server error');
}

export const getUserByToken = async (token: string): Promise<IUser | APIException> => {
    try {
        const user = await UserSchema.findOne({ token }).select(['-_id', '-__v']);
        if (!user) throw 1;
        return user;
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
    }
    return new APIException(500, 'Internal server error');
}

export const getProfile = async (id: string): Promise<ProfileData | APIException> => {
    try {
        const user = await UserSchema.findOne({ id }).select(['-_id', '-__v']);

        if (!user) throw 1;

        return { username: user.username, email: user.email, validated: user.validated, radarDistance: user.radarDistance };
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
    }
    return new APIException(500, 'Internal server error');
}

export const getEmail = async (id: string): Promise<EmailData | APIException> => {
    try {
        const user = await UserSchema.findOne({ id });
        if (!user) throw 1;

        return { email: user.email, validated: user.validated };
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
        return new APIException(500, 'Internal server error');
    }
}

export const validateEmail = async (id: string): Promise<boolean | APIException> => {
    try {
        const user = await UserSchema.findOne({ id });
        if (!user) throw 1;

        user.validated = true;
        await user.save();

        return true;
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
        console.error(e);
        return new APIException(500, 'Internal server error');
    }
}

export const changeRadarDistance = async (id: string, radarDistance: number) => {
    try {
        const user = await UserSchema.findOne({ id });
        if (!user) throw 1;

        user.radarDistance = radarDistance;
        await user.save();

        return true;
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
        }
        console.error(e);
        return new APIException(500, 'Internal server error');
    }
}

export const assignNotificationToken = async (id: string, notification_token: string) => {
    try {
        const notification = await NotificationSchema.create({ id, notification_token });
        return notification;
    } catch (e) {
        switch (e) {

        }
        console.error(e);
        return new APIException(500, 'Internal server error');
    }
}