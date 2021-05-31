export default function errorHandler(error, request, response, next) {
  console.error(error);

  const status = error.status || 500;
  const message = {
    success: false,
    error: error.message || 'Something went wrong',
  };

  response.status(status).send(message);
}
