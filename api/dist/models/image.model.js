"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
var mongoose_1 = require("mongoose");
var imageSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: [true, 'Debe existir una imagen']
    },
    thumbnail: {
        type: String,
    },
    created_at: {
        type: Date
    }
});
imageSchema.pre('save', function (next) {
    this.created_at = new Date();
    // Aqui es donde voy a generar el thumbnail
    next();
});
exports.Image = mongoose_1.model('Image', imageSchema);
