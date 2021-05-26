/**
 * Bootstrap server. Attach helmet, cors and configure winston logger.
 */

import * as bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

export default app;
