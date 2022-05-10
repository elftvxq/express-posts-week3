const handleError = (res, status, errorCode, message) => {
  const errorCodeMessage = {
    205: '重新發送',
    400: {
      40001: '沒有對應資料',
      40002: message,
      40003: '沒有此 ID',
    },
    404: '無此要求',
  };

  const displayMessage =
    errorCodeMessage[status][errorCode] || errorCodeMessage[status];

  // add error status
  res.status(status).send({
    status: 'false',
    message: displayMessage,
  });
  res.end();
};
module.exports = handleError;
