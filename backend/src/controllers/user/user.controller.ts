import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret";
const SALT_ROUNDS = 10;

export const register: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await userModel.create({ username, email, password: hashedPassword });

    return res.status(201).json({ message: "Hereglegch amjilttai uuslee" });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ message: "Hereglegch uusehed aldaaa garlaa" });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "amjilttai newterleee", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "newterhed aldaa garalaa" });
  }
};
