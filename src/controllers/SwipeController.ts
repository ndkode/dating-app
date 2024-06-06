import { Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import Auth, { AuthRequest } from "../middlewares/Auth";
import { inject } from "inversify";
import { IUserService, UserService } from "../services/UserService";
import { Features } from "../models/User";

@controller("/swipe")
export class SwipeController {
  constructor(
    @inject(UserService) private readonly userService: IUserService
  ) {}

  @httpPost("/", Auth)
  async swipe(req: AuthRequest, res: Response) {
    const { targetUserId, direction } = req.body; // direction: 'left' (pass), 'right' (like)
    const { userId } = <any>req.jwtPayload;
    // Validate input (omitted for brevity)
    if (targetUserId == userId) {
      return res
        .status(400)
        .json({ message: "target userId tidak boleh sama!" });
    }

    let user = await this.userService.findUserById(userId);
    if (!user)
      return res.status(400).json({ message: "user tidak ditemukan!" });
    console.log("user", user);

    if (
      user &&
      user.swipeHistory &&
      user.swipeHistory[targetUserId] == "left"
    ) {
      return res
        .status(400)
        .json({ message: "target user sudah pernah dibandingkan!" });
    }

    const targetUser = await this.userService.findUserById(targetUserId);
    console.log("targetUser", targetUser);
    if (!targetUser) {
      return res.status(400).json({ message: "target user tidak ditemukan!" });
    } else if (
      targetUser &&
      targetUser.swipeHistory &&
      targetUser.swipeHistory[userId] == "right"
    ) {
      user = await this.userService.swipe(user, targetUser, direction);
      return res.status(201).json({ message: "Match!", user: targetUser });
    }

    switch (direction) {
      case "left":
        if (
          !user.premiumFeatures.includes(Features.NO_SWIPE_LIMIT) &&
          user.swipesLeft <= 0
        ) {
          return res.status(400).json({ message: "quota user execeed!" });
        } else if (!user.premiumFeatures.includes(Features.NO_SWIPE_LIMIT)) {
          user = await this.userService.swipe(user, targetUser, direction);
        }

        break;
      case "right":
        if (
          !user.premiumFeatures.includes(Features.NO_SWIPE_LIMIT) &&
          user.swipesLeft <= 0
        ) {
          return res.status(400).json({ message: "quota user execeed!" });
        } else if (!user.premiumFeatures.includes(Features.NO_SWIPE_LIMIT)) {
          user = await this.userService.swipe(user, targetUser, direction);
        }
        break;
    }

    // Rate limiting logic (using Redis or in-memory storage)
    // - Check user's swipe count for the day
    // - Update count or reject request if limit reached

    // Check if profiles have already interacted (swipe history)
    // - Use a separate collection or field in the `User` model

    // Update swipe history and target user's likes (if applicable)

    res.json({ message: "Swipe successful", user }); // Adjust response based on outcome
  }
}
