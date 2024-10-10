import { RequestHandler } from "express";
import { userModel } from "../../models"; // Adjust the import path as necessary

export const getByUserId: RequestHandler = async (req, res) => {
  const { userId } = req.params; // Get userId from the request parameters

  try {
    const user = await userModel.findById(userId); // Find the user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Handle case where user is not found
    }

    return res.status(200).json(user); // Return the user data
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving user" }); // Handle server errors
  }
};
