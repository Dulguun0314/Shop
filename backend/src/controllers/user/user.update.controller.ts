import { Request, Response } from "express";
import { userModel } from "../../models";

// Update user details
export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params; // Assuming userId is passed as a URL parameter
  const { lastName, phone, address } = req.body;

  try {
    // Find the user and update the necessary fields
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { lastName, phone, address },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating user details",
    });
  }
};
