import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { inject } from "inversify";
import { IUserService, UserService } from "../services/UserService";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import jwt from "jsonwebtoken";
import Auth, { AuthRequest } from "../middlewares/Auth";

@controller("/user")
export class UserController {
  constructor(
    @inject(UserService) private readonly userService: IUserService
  ) {}

  @httpGet("/view", Auth)
  async lists(req: AuthRequest, res: Response) {
    const { userId } = <any>req.jwtPayload;

    try {
      const user = await this.userService.getUserView(userId);
      res.status(200).json({ message: "view user", user });
    } catch (err) {
      res.status(500).json({ message: "Error creating user", error: err });
    }
  }

  @httpPost("/signup")
  async signup(req: Request, res: Response) {
    const { username, email, password } = req.body;

    // Check for existing user
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      const savedUser = await this.userService.craete(newUser);
      res
        .status(201)
        .json({ message: "User created successfully", user: savedUser });
    } catch (err) {
      res.status(500).json({ message: "Error creating user", error: err });
    }
  }

  @httpPost("/login")
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // Find user by email
    const user = await this.userService.findUserByEmail(email);
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // Generate and send JWT (omitted for brevity)
    const generateJWT = (payload: Object) => {
      const secretKey = process.env.JWT_SECRET!; // Ensure secret key is defined
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Set expiration time
      return token;
    };

    res.json({
      message: "Login successful",
      token: generateJWT({
        userId: user._id,
      }),
    });
  }
}
