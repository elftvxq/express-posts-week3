const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('資料庫連接成功'));

// mongoose
//   .connect('mongodb://localhost:27017/test')
//   .then(() => {
//     console.log('Local DB 連線成功');
//   })
//   .catch((error) => {
//     console.log(error);
//   });