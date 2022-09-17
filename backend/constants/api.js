const StatusCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const errorMessage = {
  [StatusCode.NOT_FOUND]: 'Данные по указанному _id не найдены',
  [StatusCode.UNAUTHORIZED]: 'Необходима авторизация',
  [StatusCode.FORBIDDEN]: 'Доступ запрещен',
  [StatusCode.BAD_REQUEST]: 'Переданы некорректные данные',
  [StatusCode.CONFLICT]: 'Пользователь с указанным email уже существует',
  [StatusCode.INTERNAL_SERVER_ERROR]: (message) => `На сервере произошла ошибка: ${message}`,
};

module.exports = { StatusCode, errorMessage };
