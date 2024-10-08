"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//express server will go here 
const dotenv_1 = __importDefault(require("dotenv"));
const addFriend_1 = __importDefault(require("./routes/addFriend"));
const getFriends_1 = __importDefault(require("./routes/getFriends"));
const getHabits_1 = __importDefault(require("./routes/getHabits"));
const addHabit_1 = __importDefault(require("./routes/addHabit"));
const updateFriend_1 = __importDefault(require("./routes/updateFriend"));
const path_1 = __importDefault(require("path"));
const removeFriend_1 = __importDefault(require("./routes/removeFriend"));
const getUsers_1 = __importDefault(require("./routes/getUsers"));
dotenv_1.default.config({ path: "../.env" });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const deleteHabit_1 = __importDefault(require("./routes/deleteHabit"));
const updateHabit_1 = __importDefault(require("./routes/updateHabit"));
mongoose_1.default.connect(process.env.MONGO_URI || "").then(() => console.log("MongoDB connected!")).catch(() => console.log("Could not connect to MongoDB"));
const app = (0, express_1.default)();
console.log(path_1.default.join(__dirname));
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/dist')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000/',
    credentials: true,
}));
app.use(express_1.default.json());
app.get('/api/health', async (req, res) => {
    res.json({ "message": "backend healthy!" });
    console.log("here");
});
// app.use(auth({
//     audience:'/api', 
//     issuerBaseURL: 'https://dev-1hayc3662ummsupb.us.auth0.com/', 
//     tokenSigningAlg: 'RS256'
// }))
app.use(addFriend_1.default);
app.use(getFriends_1.default);
app.use(getHabits_1.default);
app.use(addHabit_1.default);
app.use(deleteHabit_1.default);
app.use(updateHabit_1.default);
app.use(removeFriend_1.default);
app.use(updateFriend_1.default);
app.use(getUsers_1.default);
app.disable('etag');
app.listen(process.env.PORT || 3001, () => {
    console.log(`App on ${process.env.PORT}`);
});
exports.default = app;
