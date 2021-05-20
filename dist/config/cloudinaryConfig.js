"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectCloudinary = void 0;
var cloudinary_1 = __importDefault(require("cloudinary"));
var index_1 = require("./index");
var connectCloudinary = function () {
    // Configuracion de cloudinary
    cloudinary_1.default.v2.config({
        cloud_name: index_1.config.cloudName,
        api_key: index_1.config.apiKey,
        api_secret: index_1.config.apiSecret
    });
};
exports.connectCloudinary = connectCloudinary;
