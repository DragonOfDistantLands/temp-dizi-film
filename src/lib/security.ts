import DOMPurify from 'dompurify';
import { hash, compare } from 'bcryptjs';

// Content Security
export function sanitizeHtml(content: string): string {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
}

// XSS Prevention
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Rate Limiting
const requestCounts = new Map<string, { count: number; timestamp: number }>();

export function rateLimiter(ip: string, limit: number = 100, windowMs: number = 900000): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip) || { count: 0, timestamp: now };

  if (now - record.timestamp > windowMs) {
    record.count = 1;
    record.timestamp = now;
  } else {
    record.count++;
  }

  requestCounts.set(ip, record);
  return record.count <= limit;
}

// Input Validation
export function validateInput(input: string, pattern: RegExp): boolean {
  return pattern.test(input);
}

// Secure Headers
export const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "frame-src https://www.youtube.com; " +
    "connect-src 'self' https://api.seriesdownload.com;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};