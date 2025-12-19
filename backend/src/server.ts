/**
 * Express Server for OpenRTB 2.6 Bid Request Generator
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import apiRoutes from './api/routes';

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// API routes
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'OpenRTB 2.6 Bid Request Generator API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      generate: 'POST /api/generate',
      example: 'GET /api/example'
    }
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('OpenRTB 2.6 Bid Request Generator API');
  console.log('='.repeat(50));
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Example request: http://localhost:${PORT}/api/example`);
  console.log('='.repeat(50));
});

export default app;
