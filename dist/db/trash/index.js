"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNearestTrashes = exports.createTrash = void 0;
const types_1 = require("../../types");
const uuid = __importStar(require("uuid"));
const db_schemas_1 = require("../db.schemas");
const day = 24 * 60 * 60 * 1000;
const createTrash = (user_id, locationArray, image_id, fileName, tags, desc) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = uuid.v4();
        const expiration = Date.now() + day;
        const location = { type: 'Point', coordinates: locationArray };
        yield db_schemas_1.TrashSchema.create({ id, desc, expiration, user_id, location, image_id, tags, fileName });
        return true;
    }
    catch (e) {
        switch (e) {
        }
        console.error(e);
        return new types_1.APIException(500, 'Internal server error');
    }
});
exports.createTrash = createTrash;
const getNearestTrashes = (location, distance, tag) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trashesNear = yield db_schemas_1.TrashSchema.find({
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
        if (!trashesNear)
            throw 1;
        return trashesNear;
    }
    catch (e) {
        switch (e) {
            case 1:
                return new types_1.APIException(400, 'No nearby trashes');
        }
        console.error(e);
        return new types_1.APIException(500, 'Internal server error');
    }
});
exports.getNearestTrashes = getNearestTrashes;
//# sourceMappingURL=index.js.map