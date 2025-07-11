import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import indexRoutes from './routes/index.js';

const app = express();

// CORS 配置 - 允许所有来源
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: '*',
  credentials: true
}));

app.use(bodyParser.json());

app.use('/api', indexRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

export default app; 