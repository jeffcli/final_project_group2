"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//express server will go here 
const dotenv_1 = __importDefault(require("dotenv"));
const addFriend_1 = __importDefault(require("./routes/addFriend"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: "../.env" });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
mongoose_1.default.connect(process.env.MONGO_URI || "").then(() => console.log("MongoDB connected!")).catch(() => console.log("Could not connect to MongoDB"));
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', async (req, res) => {
    res.json({ "message": "backend healthy!" });
    console.log("here");
});
app.use(addFriend_1.default);
app.disable('etag');
app.listen(process.env.VITE_BE_PORT || 3001, () => {
    console.log("App ready on port 3001");
});
exports.default = app;
