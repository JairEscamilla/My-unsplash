"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("./config");
var images_1 = __importDefault(require("./routes/images"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var users_1 = __importDefault(require("./routes/users"));
var db_1 = require("./config/db");
var cloudinaryConfig_1 = require("./config/cloudinaryConfig");
var app = express_1.default();
var router = express_1.default.Router();
db_1.connectDB();
cloudinaryConfig_1.connectCloudinary();
// Middlewares
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_fileupload_1.default({ useTempFiles: true }));
app.use(router);
// Ruta principal
router.get('/', function (req, res) {
    res.send("<h1>Bienvenido a la API de MyUnsplash</h1>");
});
// Conectando rutas
images_1.default(app);
users_1.default(app);
// Iniciando servidor
app.listen(config_1.config.port, function () {
    console.log("Server listening on port " + config_1.config.port);
});
