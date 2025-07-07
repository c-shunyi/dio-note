import app from './app.js';
import { sequelize } from './models/index.js';

const PORT = process.env.PORT || 8810;

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})(); 