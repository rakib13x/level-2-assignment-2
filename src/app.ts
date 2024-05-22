/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { orderRoutes } from './app/routes/order.route';
import { productRoutes } from './app/routes/product.route';

dotenv.config();

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//app routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);

app.use((req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'welcome to my page',
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error-handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong.',
    error: err.message,
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
