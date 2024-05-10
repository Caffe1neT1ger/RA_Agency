export class ApiError extends Error {
  constructor(status, message, errors) {
    super(message);
    message.message;
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }

  static Forbidden() {
    return new ApiError(403, 'Недостаточно прав');
  }
}
