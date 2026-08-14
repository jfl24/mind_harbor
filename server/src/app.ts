import express from 'express';

import authRouter from './routes/auth.routes.js'

import { errorHandler } from './middlewares/error.js';

const app = express();

//app.use(helmet());
//app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
//app.use(morgan(’dev’));

app.get('/api/v1/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/v1/auth', authRouter);

app.use((_req, res) => {
res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route introuvable.' } });
});
app.use(errorHandler);

export default app;