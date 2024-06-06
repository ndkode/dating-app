"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const inversify_1 = require("inversify");
const UserService_1 = require("../services/UserService");
const inversify_express_utils_1 = require("inversify-express-utils");
let UserController = class UserController extends inversify_express_utils_1.BaseHttpController {
    constructor(userService) {
        super();
        this.userService = userService;
    }
    signup() {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = this.httpContext.request.body;
            // Check for existing user
            const existingUser = yield this.userService.findUserByEmail(email);
            if (existingUser) {
                return this.badRequest("Email already exists");
            }
            // Hash password
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            // Create new user
            const newUser = new User_1.default({ username, email, password: hashedPassword });
            try {
                const savedUser = yield this.userService.craete(newUser);
                this
                    .json({ message: "User created successfully", user: savedUser }, 201);
            }
            catch (err) {
                this.internalServerError(err);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            // Find user by email
            const user = yield this.userService.findUserByEmail(email);
            if (!user)
                return res.status(401).json({ message: "Invalid email or password" });
            // Verify password
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                return res.status(401).json({ message: "Invalid email or password" });
            // Generate and send JWT (omitted for brevity)
            res.json({ message: "Login successful", user });
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpPost)("/signup"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    (0, inversify_express_utils_1.controller)("/user"),
    __param(0, (0, inversify_1.inject)(UserService_1.UserService)),
    __metadata("design:paramtypes", [Object])
], UserController);
exports.UserController = UserController;
