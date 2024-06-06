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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwipeController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
let SwipeController = class SwipeController {
    swipe(req, res) {
        const { userId, targetUserId, direction } = req.body; // direction: 'left' (pass), 'right' (like)
        // Validate input (omitted for brevity)
        // Check user authentication (omitted for brevity)
        // Rate limiting logic (using Redis or in-memory storage)
        // - Check user's swipe count for the day
        // - Update count or reject request if limit reached
        // Check if profiles have already interacted (swipe history)
        // - Use a separate collection or field in the `User` model
        // Update swipe history and target user's likes (if applicable)
        res.json({ message: "Swipe successful" }); // Adjust response based on outcome
    }
};
__decorate([
    (0, inversify_express_utils_1.httpPost)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SwipeController.prototype, "swipe", null);
SwipeController = __decorate([
    (0, inversify_express_utils_1.controller)("/swipe")
], SwipeController);
exports.SwipeController = SwipeController;
