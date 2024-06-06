import { Container } from "inversify";
import { UserController } from "./controllers/UserController";
import { UserService } from "./services/UserService";
import { UserRepository } from "./repositories/UserRepository";
import { SwipeController } from "./controllers/SwipeController";

const container = new Container();
//User
container.bind<UserController>(UserController).toSelf();
container.bind<UserService>(UserService).toSelf();
container.bind<UserRepository>(UserRepository).toSelf();

//Swipe
container.bind<SwipeController>(SwipeController).toSelf();

export default container;