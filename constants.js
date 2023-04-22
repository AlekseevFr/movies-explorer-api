const CODES = {
  CONFLICT: 409,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  INTERNAL: 500,
};

const MESSAGES = {
  USER_CONFLICT: 'Пользователь с таким email уже существует',
  MOVIE_CONFLICT: 'Фильм с таким id уже существует',
  FORBIDDEN: 'Нет прав для выполнения действия',
  NOT_FOUND: 'Не найдено',
  UNAUTHORIZED: 'Необходима авторизация',
  WRONG_DATA: 'Неверные данные в поле',
  UNKNOWN_ERROR: 'Что-то пошло не так',
  SERVER_ERROR: 'Ошибка сервера',
};

module.exports = {
  MESSAGES, CODES,
};
