"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_config_1 = __importDefault(require("./inversify.config"));
function main() {
    dotenv_1.default.config(); // Load environment variables
    // Connect to MongoDB
    const dbconnection = String(process.env.MONGODB_URI);
    mongoose_1.default
        .connect(dbconnection, {
        serverSelectionTimeoutMS: 5000,
        autoCreate: true,
        autoIndex: true,
    })
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.error(err));
    const server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.default);
    server.setConfig((app) => {
        // Middleware
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
    });
    const port = process.env.PORT || 5000;
    server.build().listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
}
exports.main = main;
main();
