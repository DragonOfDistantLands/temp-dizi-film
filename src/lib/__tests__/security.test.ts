import { 
  sanitizeHtml, 
  escapeHtml, 
  validateInput, 
  rateLimiter 
} from '../security';

describe('Security Utils', () => {
  describe('sanitizeHtml', () => {
    it('removes dangerous HTML', () => {
      const input = '<p>Hello</p><script>alert("xss")</script>';
      expect(sanitizeHtml(input)).toBe('<p>Hello</p>');
    });

    it('allows safe HTML', () => {
      const input = '<p><strong>Hello</strong> <em>World</em></p>';
      expect(sanitizeHtml(input)).toBe(input);
    });
  });

  describe('escapeHtml', () => {
    it('escapes special characters', () => {
      const input = '<script>alert("xss")</script>';
      expect(escapeHtml(input)).not.toContain('<script>');
    });
  });

  describe('validateInput', () => {
    it('validates email correctly', () => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      expect(validateInput('test@example.com', emailPattern)).toBe(true);
      expect(validateInput('invalid-email', emailPattern)).toBe(false);
    });
  });

  describe('rateLimiter', () => {
    it('limits requests within window', () => {
      const ip = '127.0.0.1';
      const limit = 2;
      const windowMs = 1000;

      expect(rateLimiter(ip, limit, windowMs)).toBe(true); // First request
      expect(rateLimiter(ip, limit, windowMs)).toBe(true); // Second request
      expect(rateLimiter(ip, limit, windowMs)).toBe(false); // Third request (blocked)
    });
  });
});