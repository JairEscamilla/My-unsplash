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
    asset_id: {
        type: String,
        required: [true, "El asset debe tener un id"]
    },
    public_id: {
        type: String,
        required: [true, "El asset debe tener un id publico"]
    },
    height: {
        type: Number,
        required: [true, "El asset debe tener una altura"]
    },
    width: {
        type: Number,
        required: [true, "El asset debe tener un ancho"]
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe existir una referencia a un usuario']
    },
    created_at: {
        type: Date
    }
});
exports.Image = mongoose_1.model('Image', imageSchema);
