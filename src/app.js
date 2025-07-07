import express from 'express';
import bodyParser from 'body-parser';
import indexRoutes from './routes/index.js';

const app = express();
app.use(bodyParser.json());

app.use('/api', indexRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

export default app; 