import { inject, injectable } from "inversify";
import { IUser } from "../models/User";
import {
  IUserRepository,
  UserRepository,
} from "../repositories/UserRepository";
import { Types } from "mongoose";

export interface IUserService {
  findUserById(id: string): Promise<IUser | null>;
  findUserByEmail(email: string): Promise<IUser | null>;
  getUserView(userId: string): Promise<IUser | null>;
  craete(user: IUser): Promise<IUser | null>;
  swipe(
    user: IUser,
    targetUser: IUser,
    direction: "left" | "right"
  ): Promise<IUser | null>;
}

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  findUserById(id: string): Promise<IUser | null> {
    return this.userRepository.findUser(
      { _id: new Types.ObjectId(id) },
      { password: 0 }
    );
  }

  findUserByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.findUser({ email: email });
  }

  async getUserView(userId: string): Promise<IUser | null> {
    const user = await this.findUserById(userId);
    if (user) {
      return this.userRepository.findUser({
        _id: {
          $nin: [
            new Types.ObjectId(String(user._id)),
            Object.keys(user.swipeHistory).map(
              (swipeHistory) => new Types.ObjectId(swipeHistory)
            ),
          ],
        },
      });
    } else {
      return null;
    }
  }

  craete(user: IUser): Promise<IUser | null> {
    return this.userRepository.craete(user);
  }

  swipe(
    user: IUser,
    targetUser: IUser,
    direction: "left" | "right"
  ): Promise<IUser | null> {
    const update = {
      $inc: { swipesLeft: -1 },
      $set: {
        swipeHistory: { [targetUser.id]: direction },
      },
    }; // Decrement swipe by 1 and add swipe history
    return this.userRepository.update(user, update);
  }

  match(
    user: IUser,
    targetUser: IUser,
    direction: "left" | "right"
  ): Promise<IUser | null> {
    const update = {
      $set: {
        swipeHistory: { [targetUser.id]: direction },
      },
    }; // Decrement swipe by 1 and add swipe history
    return this.userRepository.update(user, update);
  }
}
