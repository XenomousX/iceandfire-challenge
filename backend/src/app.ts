import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import favoriteRoutes from "./routes/favorite";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Middleware
app.use(cors());

// Custom JSON middleware that handles empty bodies
app.use((req, res, next) => {
  if (req.method === 'GET' || req.method === 'DELETE') {
    // Skip JSON parsing for GET and DELETE requests
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
