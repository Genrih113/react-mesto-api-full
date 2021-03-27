/*
function sendError(err, res) {
  console.log(err);
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Введены не корректные данные', err }); //  если ошибка при валидации
  } else if (err.kind === 'ObjectId') {
    res.status(400).send({ message: 'Введен не корректный идентификатор', err }); //  если ош из-за невер id (н-р: короткий)
  } else if (err.status === 404 && err.entityType) {
    if (err.entityType === 'user') {
      res.status(404).send({ message: 'Не удалось найти пользователя', err }); //  если id корректный но такого id нет
    } else if (err.entityType === 'card') {
      res.status(404).send({ message: 'Не удалось найти карточку', err }); //  если id корректный но такого id нет
    }
  } else {
    res.status(500).send(err); //  если еще какая напасть
  }
}

function setOrFailError(entityTypeAsString) {
  const err = new Error();
  err.status = 404;
  err.entityType = entityTypeAsString;
  console.log('err');
  throw err;
}


function setRejectedPromiseError(status, message) {
  const err = new Error();
  err.status = status;
  err.message = message;
  throw err;
}

module.exports = { sendError, setOrFailError, setRejectedPromiseError };
*/

function sendError(err, res) {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Введены не корректные данные', err }); //  если ошибка при валидации
  } else if (err.kind === 'ObjectId') {
    res.status(400).send({ message: 'Введен не корректный идентификатор', err }); //  если ош из-за невер id (н-р: короткий)
  } else if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с таким email уже существует', err }); //  когда соз-ся польз-ль, но такой уже есть
  } else if (err.custom === true) {
    res.status(err.status).send({ message: err.message }); //  если id корректный но такого id нет
  } else {
    res.status(500).send(err); //  если еще какая напасть
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
