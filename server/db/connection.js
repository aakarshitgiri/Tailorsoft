const mongoose = require("mongoose");

//MONGO_URI connection

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log(err.message));
