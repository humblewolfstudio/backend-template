import { APIException, ILocation, ITrash } from "../../types";
import * as uuid from 'uuid';
import { TrashSchema } from "../db.schemas";

const day = 24 * 60 * 60 * 1000;

export const createTrash = async (user_id: string, locationArray: Array<number>, image_id: string, fileName: string, tags?: string, desc?: string) => {
    try {
        const id = uuid.v4();
        const expiration = Date.now() + day;
        const location: ILocation = { type: 'Point', coordinates: locationArray };

        await TrashSchema.create({ id, desc, expiration, user_id, location, image_id, tags, fileName });
        return true;
    } catch (e) {
        switch (e) {

        }
        console.error(e);
        return new APIException(500, 'Internal server error');
    }
}

export const getNearestTrashes = async (location: Array<number>, distance: number, tag: string): Promise<Array<ITrash> | APIException> => {
    try {
        const trashesNear = await TrashSchema.find({
            location: {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: location
                    },
                    $maxDistance: distance
                }
            },
            tags: tag
        }).select(['-_id', '-__v']);

        if (!trashesNear) throw 1;
        return trashesNear;
    } catch (e) {
        switch (e) {
            case 1:
                return new APIException(400, 'No nearby trashes');
        }
        console.error(e);
        return new APIException(500, 'Internal server error');
    }
}