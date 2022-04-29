function handleSuccess(res, data) {
  // send: 傳入的型別來決定回傳格式
  // String => HTML
  // Array or Object => JSON
  // 預設帶入 res.end
  res.send({
    status: true,
    data,
  });
  res.end();
}
module.exports = handleSuccess;
