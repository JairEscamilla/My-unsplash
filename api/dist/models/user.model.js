"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'El username es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido']
    },
    password: {
        type: String,
        required: [true, 'Es necesario tener una contraseña']
    },
    profile_photo: {
        type: String,
        default: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'
    }
});
userSchema.pre('save', function (next) {
    this.password = bcryptjs_1.default.hashSync(this.password, 10);
    next();
});
exports.User = mongoose_1.model('User', userSchema);
