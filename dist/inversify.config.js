"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const UserController_1 = require("./controllers/UserController");
const UserService_1 = require("./services/UserService");
const UserRepository_1 = require("./repositories/UserRepository");
const SwipeController_1 = require("./controllers/SwipeController");
const container = new inversify_1.Container();
//User
container.bind(UserController_1.UserController).toSelf();
container.bind(UserService_1.UserService).toSelf();
container.bind(UserRepository_1.UserRepository).toSelf();
//Swipe
container.bind(SwipeController_1.SwipeController).toSelf();
exports.default = container;
