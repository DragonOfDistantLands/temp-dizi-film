import { Request, Response, NextFunction } from 'express';
import { rateLimiter, securityHeaders } from '@/lib/security';

export function securityMiddleware(req: Request, res: Response, next: NextFunction) {
  // Apply Security Headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Rate Limiting
  if (!rateLimiter(req.ip)) {
    return res.status(429).json({ 
      error: 'Too many requests, please try again later.' 
    });
  }

  // Prevent Clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // HTTP Strict Transport Security
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  next();
}