"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var index_1 = require("./index");
var connectDB = function () {
    // Conexion con la base de datos
    var USER = index_1.config.dbuser;
    var PASSWORD = index_1.config.dbpassword;
    var MONGO_URI = "mongodb+srv://" + USER + ":" + PASSWORD + "@" + index_1.config.dbHost + ":/" + index_1.config.dbName + "?retryWrites=true&w=majority";
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
};
exports.connectDB = connectDB;
