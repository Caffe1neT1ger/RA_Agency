export class ApiError extends Error {
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }

  static BadRequest(message, errors) {
    return new ApiError(400, message, errors);
  }

  static Forbidden() {
    return new ApiError(403, 'Недостаточно прав');
  }
}
