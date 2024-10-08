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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const cloudinary_1 = require("cloudinary");
const buffer_1 = require("buffer");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
// Function to handle file upload to Cloudinary
function handleUpload(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield cloudinary_1.v2.uploader.upload(file, {
            resource_type: "auto",
        });
        return res;
    });
}
// Controller function for file upload
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file)
        return res.status(400).send("No file uploaded.");
    try {
        const b64 = buffer_1.Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = yield handleUpload(dataURI);
        res.json(cldRes);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("File upload failed.");
    }
});
exports.uploadFile = uploadFile;
