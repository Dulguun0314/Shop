import { userModel } from "../src/models/user.schema";

declare global {
  namespace Express {
    interface Request {
      user?: userModel; // Таны хэрэглэгчийн загварын дагуу тохируулна уу
    }
  }
}
