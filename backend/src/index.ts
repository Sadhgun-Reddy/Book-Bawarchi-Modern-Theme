import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import catererRoutes from './routes/caterers';
import menuRoutes from './routes/menus';
import enquiryRoutes from './routes/enquiries';
import recipeRoutes from './routes/recipes';
import donationRoutes from './routes/donations';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/caterers', catererRoutes);
app.use('/api/v1/menus', menuRoutes);
app.use('/api/v1/enquiries', enquiryRoutes);
app.use('/api/v1/recipes', recipeRoutes);
app.use('/api/v1/food-support/donations', donationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
