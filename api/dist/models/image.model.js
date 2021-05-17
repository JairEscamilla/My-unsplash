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
exports.Image = mongoose_1.model('Image', imageSchema);
