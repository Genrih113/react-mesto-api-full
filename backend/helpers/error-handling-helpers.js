function sendError(err, res) {
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
  throw err;
}

module.exports = { sendError, setOrFailError };
