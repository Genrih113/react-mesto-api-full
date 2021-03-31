function sendError(err, res) {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Введены не корректные данные' }); //  если ошибка при валидации
  } else if (err.kind === 'ObjectId') {
    res.status(400).send({ message: 'Введен не корректный идентификатор' }); //  если ош из-за невер id (н-р: короткий)
  } else if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с таким email уже существует' }); //  когда соз-ся польз-ль, но такой уже есть
  } else if (err.custom === true) {
    res.status(err.status).send({ message: err.message }); //  если id корректный но такого id нет
  } else {
    res.status(500).send(err.message); //  если еще какая напасть
  }
}

function setCustomErrorStatusAndMessage(status, message) {
  const err = new Error();
  err.custom = true;
  err.status = status;
  err.message = message;
  throw err;
}

module.exports = { sendError, setCustomErrorStatusAndMessage };
