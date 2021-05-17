"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("./config");
var images_1 = __importDefault(require("./routes/images"));
var mongoose_1 = __importDefault(require("mongoose"));
var cloudinary = require('cloudinary').v2;
var app = express_1.default();
var router = express_1.default.Router();
// Conexion con la base de datos
var USER = config_1.config.dbuser;
var PASSWORD = config_1.config.dbpassword;
var MONGO_URI = "mongodb+srv://" + USER + ":" + PASSWORD + "@" + config_1.config.dbHost + ":/" + config_1.config.dbName + "?retryWrites=true&w=majority";
mongoose_1.default.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.error('Ha ocurrido un error):');
        throw error;
    }
    console.log('La base de datos está conectada');
});
// Configuracion de cloudinary
cloudinary.config({
    cloud_name: config_1.config.cloudName,
    api_key: config_1.config.apiKey,
    api_secret: config_1.config.apiSecret
});
// Middlewares
app.use(express_1.default.json());
app.use(router);
// Ruta principal
router.get('/', function (req, res) {
    res.send("<h1>Bienvenido a la API de MyUnsplash</h1>");
});
// Conectando rutas
images_1.default(app);
// Iniciando servidor
app.listen(config_1.config.port, function () {
    console.log("Server listening on port " + config_1.config.port);
});
