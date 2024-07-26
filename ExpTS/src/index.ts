import express, { Request, Response, NextFunction } from "express";
import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import router from './router/router' 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;
const logDir = process.env.LOG_DIR || './logs';

const logger = (format: 'simple' | 'complete') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const logFilePath = path.join(logDir, 'access.log');

        let logEntry = `[${new Date().toISOString()}], ${req.url}, ${req.method}`;

        if (format === 'complete') {
            logEntry += `, HTTP/${req.httpVersion}, ${req.get('User-Agent')}`;
        }

        logEntry += '\n';

        fs.appendFile(logFilePath, logEntry, (err) => {
            if (err) {
                console.error('Failed to write log:', err);
            }
        });

        next();
    };
};

// simple ou complete definem o tipo de logger a ser utilizado
app.use(logger('complete'));
app.engine("handlebars",engine({ 
    helpers: require(path.join(__dirname + '/views/helpers/helpers.ts')),
    layoutsDir: path.join(__dirname + '/views/layouts'),
    defaultLayout: 'main'
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname + '/views'));
app.use(router);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}.`);
});