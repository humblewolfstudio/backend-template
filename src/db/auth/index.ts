import { APIException, IUser } from "../../types";
import { UserSchema } from "../db.schemas";
import { getUserByEmail, getUserByToken, getUserByUsername } from "../users";
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';

type LoginResponse = {
    id: string,
    token: string,
    username: string
}

type RegisterResponse = {
    id: string,
    token: string,
    username: string,
    email: string
}

type AuthResponse = {
    id: string,
    username: string,
    email: string,
    distance: number
}

export const logInUser = async (username: string, password: string): Promise<LoginResponse | APIException> => {
    try {
        const user = await getUserByUsername(username);
        if (user instanceof APIException) throw 1;
        const matchPassword = await bcrypt.compare(password, user.hashedPw);
        if (matchPassword) {
            return { id: user.id, token: user.token, username: user.username }
        } else {
            throw 2;
        }
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'User doesnt exist');
            case 2:
                return new APIException(401, "Unauthorized");
        }
    }
    return new APIException(500, 'Internal server error');
}

export const registerUser = async (username: string, password: string, email: string): Promise<RegisterResponse | APIException> => {
    try {
        const userExists = await getUserByUsername(username);
        if (!(userExists instanceof APIException)) throw 1;
        const emailExists = await getUserByEmail(email);
        if (!(emailExists instanceof APIException)) throw 2;

        const hashedPw = await bcrypt.hash(password, 12);
        const id = uuid.v4();
        const token = uuid.v4();
        const radarDistance = 1000;
        const validated = false;

        const user = await UserSchema.create({ id, username, email, hashedPw, token, validated, radarDistance });

        return { username, id, email, token };
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'Username already exists');
            case 2:
                return new APIException(400, 'Account with this email already exists');
        }
    }
    return new APIException(500, 'Internal server error');
}

export const authenticate = async (token: string): Promise<AuthResponse | APIException> => {
    try {
        const user = await getUserByToken(token);
        if (user instanceof APIException) throw 1;
        return { id: user.id, username: user.username, email: user.email, distance: user.radarDistance };
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(401, "Unauthorized");
        }
    }
    return new APIException(500, 'Internal server error');
}