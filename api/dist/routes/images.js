"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var image_model_1 = require("../models/image.model");
var response_1 = require("../response");
var cloudinary_1 = __importDefault(require("cloudinary"));
require("../strategies/jwt");
var passport_1 = __importDefault(require("passport"));
var cloudinaryOptions = {
    folder: 'uploads/',
    unique_filename: true,
    overwrite: false,
    eager: [
        {
            width: 5,
            height: 5,
            crop: 'fill'
        }
    ]
};
var imagesApi = function (app) {
    var router = express_1.Router();
    app.use('/api/images', router);
    router.get('/', passport_1.default.authenticate('jwt', { session: false }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var page, pagina, skip, images;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = req.query.page;
                    console.log(req.user);
                    pagina = Number(page) || 1;
                    skip = pagina - 1;
                    skip = skip * 10;
                    return [4 /*yield*/, image_model_1.Image.find()
                            .sort({ _id: -1 })
                            .skip(skip)
                            .limit(10)
                            .exec()];
                case 1:
                    images = _a.sent();
                    response_1.response({
                        res: res,
                        ok: true,
                        status: 200,
                        message: 'Listado de imagenes',
                        extra_data: images
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    router.post('/', passport_1.default.authenticate('jwt', { session: false }), function (req, res) {
        if (!req.files)
            response_1.response({ res: res, ok: false, status: 500, message: "Ha ocurrido un error):" });
        var image = req.files.image;
        if (!image.mimetype.includes('image'))
            response_1.response({ res: res, ok: false, status: 500, message: 'El archivo subido no es una imagen' });
        cloudinary_1.default.v2.uploader.upload(image.tempFilePath, cloudinaryOptions, function (error, result) { return __awaiter(void 0, void 0, void 0, function () {
            var newImage, imageDB, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!error) return [3 /*break*/, 1];
                        response_1.response({ res: res, ok: false, message: 'Ha ocurrido un error al subir la imagen):', status: 500 });
                        return [3 /*break*/, 6];
                    case 1:
                        newImage = {
                            image: result === null || result === void 0 ? void 0 : result.secure_url,
                            thumbnail: result === null || result === void 0 ? void 0 : result.eager[0].secure_url,
                            asset_id: result === null || result === void 0 ? void 0 : result.asset_id,
                            public_id: result === null || result === void 0 ? void 0 : result.public_id,
                            width: result === null || result === void 0 ? void 0 : result.width,
                            height: result === null || result === void 0 ? void 0 : result.height,
                            user: req.user,
                            created_at: result === null || result === void 0 ? void 0 : result.created_at
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, image_model_1.Image.create(newImage)];
                    case 3:
                        imageDB = _a.sent();
                        return [4 /*yield*/, imageDB.populate('user', '-password').execPopulate()];
                    case 4:
                        _a.sent();
                        response_1.response({ res: res, ok: true, status: 201, message: 'Imagen subida con exito', extra_data: imageDB });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        response_1.response({ res: res, ok: false, status: 500, message: 'Ha ocurrido un error al insertar la imagen' });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    });
    router.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, imageToDelete, public_id, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, image_model_1.Image.findOne({ _id: id })];
                case 1:
                    imageToDelete = _a.sent();
                    public_id = (imageToDelete === null || imageToDelete === void 0 ? void 0 : imageToDelete.public_id) || "";
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, image_model_1.Image.deleteOne({ _id: id })];
                case 3:
                    _a.sent();
                    cloudinary_1.default.v2.uploader.destroy(public_id, function (error, result) {
                        if (error) {
                            console.error(error);
                            response_1.response({ res: res, ok: false, status: 500, message: "Ha ocurrido un error):" });
                        }
                        else {
                            response_1.response({ res: res, ok: true, status: 202, message: 'La imagen se ha eliminado exitosamente' });
                        }
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error("Ha ocurrido un error: " + error_2);
                    response_1.response({
                        res: res,
                        ok: false,
                        status: 500,
                        message: 'No se ha podido eliminar la imagen'
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
};
exports.default = imagesApi;
