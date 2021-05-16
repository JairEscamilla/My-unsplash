"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("./config");
var app = express_1.default();
var router = express_1.default.Router();
// Middlewares
app.use(express_1.default.json());
app.use(router);
// Ruta principal
router.get('/', function (req, res) {
    res.send("<h1>Bienvenido a la API de MyUnsplash</h1>");
});
// Iniciando servidor
app.listen(config_1.config.port, function () {
    console.log("Server listening on port " + config_1.config.port);
});
