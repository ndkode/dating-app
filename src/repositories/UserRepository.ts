import { injectable } from "inversify";
import User, { IUser } from "../models/User";

export interface IUserRepository {
  findUser(filter: Object, projection?: Object): Promise<IUser | null>;
  craete(user: IUser): Promise<IUser | null>;
  update(user: IUser, update: Object): Promise<IUser | null>;
}

@injectable()
export class UserRepository implements IUserRepository {
  async findUser(filter: Object, projection?: Object): Promise<IUser | null> {
    return User.findOne(filter, projection);
  }

  async craete(user: IUser): Promise<IUser | null> {
    return user.save();
  }

  async update(user: IUser, update: Object): Promise<IUser | null> {
    const filter = { email: user.email };

    return await User.findOneAndUpdate(filter, update, {
      new: true,
    });
  }
}
