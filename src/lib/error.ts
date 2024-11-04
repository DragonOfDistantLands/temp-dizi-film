export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }

  static notFound(message = 'İçerik bulunamadı') {
    return new AppError(message, 'NOT_FOUND', 404);
  }

  static badRequest(message = 'Geçersiz istek') {
    return new AppError(message, 'BAD_REQUEST', 400);
  }

  static unauthorized(message = 'Yetkisiz erişim') {
    return new AppError(message, 'UNAUTHORIZED', 401);
  }

  static forbidden(message = 'Bu işlem için yetkiniz yok') {
    return new AppError(message, 'FORBIDDEN', 403);
  }

  static internal(message = 'Sunucu hatası') {
    return new AppError(message, 'INTERNAL_SERVER_ERROR', 500);
  }
}