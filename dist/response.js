"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
var response = function (_a) {
    var res = _a.res, ok = _a.ok, status = _a.status, message = _a.message, extra_data = _a.extra_data;
    if (extra_data) {
        res.status(status).json({
            ok: ok,
            message: message,
            data: extra_data
        });
    }
    else {
        res.status(status).json({
            ok: ok,
            message: message
        });
    }
};
exports.response = response;
