"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./router/router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333;
const logDir = process.env.LOG_DIR || './logs';
const logger = (format) => {
    return (req, res, next) => {
        const logFilePath = path_1.default.join(logDir, 'access.log');
        let logEntry = `[${new Date().toISOString()}], ${req.url}, ${req.method}`;
        if (format === 'complete') {
            logEntry += `, HTTP/${req.httpVersion}, ${req.get('User-Agent')}`;
        }
        logEntry += '\n';
        fs_1.default.appendFile(logFilePath, logEntry, (err) => {
            if (err) {
                console.error('Failed to write log:', err);
            }
        });
        next();
    };
};
// simple ou complete definem o tipo de logger a ser utilizado
app.use(logger('complete'));
app.use(router_1.default);
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}.`);
});
