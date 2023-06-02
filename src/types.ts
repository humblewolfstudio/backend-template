export interface IUser {
    id: string,
    username: string,
    hashedPw: string,
    token: string,
    email: string,
    validated: boolean,
    radarDistance: number
}

export interface IVerifyEmail {
    emailTo: string,
    urlToken: string,
    maxTime: number,
    user_id: string
}

export interface IChangePassword {
    user_id: string,
    maxTime: number,
    urlToken: string
}

export interface IImage {
    id: string,
    expiration: number,
    fileName: string
}

export interface ITrash {
    id: string,
    expiration: number,
    user_id: string,
    location: ILocation,
    tags?: string,
    desc?: string,
    image_id: string,
    fileName: string
}

export interface ILocation {
    type: 'Point',
    coordinates: Array<number>
}

export class APIException {
    message: string
    status: number
    constructor(status: number, message: string) {
        this.message = message;
        this.status = status;
    }
}