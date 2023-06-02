import { APIException } from '../../types';
import { ImageSchema } from "../db.schemas";
import * as uuid from 'uuid';

const week = 24 * 60 * 60 * 1000;

export const saveImage = async (fileName: string): Promise<string | APIException> => {
    try {
        const id = uuid.v4();
        const expiration = Date.now() + week;
        await ImageSchema.create({ id, expiration, fileName });
        return id;
    } catch (e) {
        switch (e) {

        }
        console.error(e);
        return new APIException(500, 'Internal server error');
    }
}