"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_handlebars_1 = require("express-handlebars");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const router_1 = __importDefault(require("./router/router"));
const uuid_1 = require("uuid");
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
app.engine("handlebars", (0, express_handlebars_1.engine)({
    helpers: require(path_1.default.join(__dirname + '/views/helpers/helpers.ts')),
    layoutsDir: path_1.default.join(__dirname + '/views/layouts'),
    defaultLayout: 'main'
}));
app.use((0, express_session_1.default)({
    genid: () => (0, uuid_1.v4)(), // usamos UUID para gerar os SESSID
    secret: 'Hi9Cf#mK98',
    resave: true,
    saveUninitialized: true,
}));
app.set("view engine", "handlebars");
app.set("views", path_1.default.join(__dirname + '/views'));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(router_1.default);
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}.`);
});
