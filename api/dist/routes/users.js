"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usersApi = function (app) {
    var router = express_1.Router();
    app.use('/api/users', router);
    router.get('', function (req, res) {
        res.status(200).send('Todo bien');
    });
};
exports.default = usersApi;
