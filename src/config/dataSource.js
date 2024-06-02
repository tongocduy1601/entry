const { DataSource } = require("typeorm");
var path = require("path");
const modelsPath = path.join(__dirname, "../modules/**/*.model.js");
module.exports = new DataSource({
  name: "default",
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [modelsPath],
});
