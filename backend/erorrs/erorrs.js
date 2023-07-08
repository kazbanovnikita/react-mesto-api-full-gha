const ERROR_INVALID_DATA = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_NOT_FOUND;
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;

module.exports = {
  ERROR_INVALID_DATA,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
};
