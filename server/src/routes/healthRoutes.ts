import { Router, Request, Response } from 'express';
import { isUsingMemoryStore } from '../config/db';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'online',
    service: 'VOXCOACH API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: isUsingMemoryStore ? 'Embedded Local Store (Dev)' : 'MongoDB Atlas / Connected',
    aiStatus: process.env.GEMINI_API_KEY ? 'Gemini API Configured' : 'Development Mock AI Engine',
  });
});

export default router;
