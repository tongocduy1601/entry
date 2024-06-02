const app = require("./app");
const dataSource = require("./src/config/dataSource");
const port = process.env.port || 3000;
dataSource
  .initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
