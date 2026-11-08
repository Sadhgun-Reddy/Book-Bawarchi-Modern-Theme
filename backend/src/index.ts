import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import catererRoutes from './routes/caterers';
import menuRoutes from './routes/menus';
import recipeRoutes from './routes/recipes';
import enquiryRoutes from './routes/enquiries';
import donationRoutes from './routes/donations';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/caterers', catererRoutes);
app.use('/api/v1/menus', menuRoutes);
app.use('/api/v1/recipes', recipeRoutes);
app.use('/api/v1/enquiries', enquiryRoutes);
app.use('/api/v1/food-support/donations', donationRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
