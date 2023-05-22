"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIException = void 0;
class APIException {
    constructor(status, message) {
        this.message = message;
        this.status = status;
    }
}
exports.APIException = APIException;
//# sourceMappingURL=types.js.map