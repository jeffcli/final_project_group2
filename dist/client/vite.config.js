"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const path_1 = __importDefault(require("path"));
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
    build: {
        outDir: 'dist'
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: process.env.VITE_BE_URL,
                changeOrigin: true,
            }
        }
    },
    resolve: {
        alias: {
            "@": path_1.default.resolve(__dirname, "./src"),
        },
    },
});
