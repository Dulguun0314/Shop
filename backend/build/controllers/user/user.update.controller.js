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
exports.updateUser = void 0;
const models_1 = require("../../models");
// Update user details
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params; // Assuming userId is passed as a URL parameter
    const { lastName, phone, address } = req.body;
    try {
        // Find the user and update the necessary fields
        const updatedUser = yield models_1.userModel.findByIdAndUpdate(userId, { lastName, phone, address }, { new: true, runValidators: true } // Return the updated document and run validators
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "User details updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error updating user details",
        });
    }
});
exports.updateUser = updateUser;
