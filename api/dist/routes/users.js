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
var passport_1 = __importDefault(require("passport"));
var user_model_1 = require("../models/user.model");
var response_1 = require("../response");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("../strategies/basic");
var index_1 = require("../config/index");
var usersApi = function (app) {
    var router = express_1.Router();
    app.use('/api/users', router);
    router.get('', function (req, res) {
        res.status(200).send('Todo bien');
    });
    router.post('/sign_in', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            passport_1.default.authenticate('basic', function (error, user) {
                if (error || !user)
                    return response_1.response({ res: res, ok: false, status: 401, message: 'Credenciales incorrectas' });
                req.login(user, { session: false }, function (error) {
                    return __awaiter(this, void 0, void 0, function () {
                        var username, email, profile_photo, payload, jwtSecret, token;
                        return __generator(this, function (_a) {
                            if (error)
                                return [2 /*return*/, response_1.response({ res: res, ok: false, status: 500, message: 'Ha ocurrido un error al autenticar al usuario' })];
                            username = user.username, email = user.email, profile_photo = user.profile_photo;
                            payload = {
                                email: email
                            };
                            jwtSecret = "" + index_1.config.jwtKey;
                            token = jsonwebtoken_1.default.sign(payload, jwtSecret, {
                                expiresIn: '1h'
                            });
                            response_1.response({ res: res, ok: true, status: 200, message: 'Inicio de sesión exitoso', extra_data: { user: { username: username, email: email, profile_photo: profile_photo }, token: token } });
                            return [2 /*return*/];
                        });
                    });
                });
            })(req, res, next);
            return [2 /*return*/];
        });
    }); });
    router.post('/sign_up', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var body, userCreated, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, user_model_1.User.create(body)];
                case 2:
                    userCreated = _a.sent();
                    response_1.response({ res: res, ok: true, status: 201, message: 'Usuario creado con éxito', extra_data: userCreated });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Ha ocurrido un error: " + error_1);
                    response_1.response({ res: res, ok: false, status: 500, message: 'Ha ocurrido un error al crear el usuario' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    router.post('/validate_data', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var usernameOrEmail, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usernameOrEmail = req.body.usernameOrEmail;
                    return [4 /*yield*/, user_model_1.User.find().or([
                            { username: usernameOrEmail },
                            { email: usernameOrEmail }
                        ]).exec()];
                case 1:
                    user = _a.sent();
                    if (user.length === 0)
                        response_1.response({ res: res, ok: true, status: 200, message: 'Username o email disponibles' });
                    else
                        response_1.response({ res: res, ok: false, status: 500, message: 'Ya existe un usuario con esa informacion' });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.default = usersApi;
