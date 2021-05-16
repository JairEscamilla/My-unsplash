"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var imagesApi = function (app) {
    var router = express_1.Router();
    app.use('/api/images', router);
    router.get('/', function (req, res) {
        res.status(200).json({
            ok: true,
            message: 'Aqui vamos a listar las imagenes'
        });
    });
};
exports.default = imagesApi;
