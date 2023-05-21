export interface IUser {
    id: string,
    username: string,
    hashedPw: string,
    token: string,
    email: string,
    validated: boolean,
    radarDistance: Number
}

export interface IVerifyEmail {
    emailTo: string,
    urlToken: string,
    maxTime: number,
    user_id: string
}

export class APIException {
    message: string
    status: number
    constructor(status: number, message: string) {
        this.message = message;
        this.status = status;
    }
}