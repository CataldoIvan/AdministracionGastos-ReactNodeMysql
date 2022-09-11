const express = require("express");
const cors = require("cors");
const router = require("./routes");
const db = require("./db/database");
const app = express()


;(async () => {
  try {
    await db.authenticate();
    await db.sync()
    
  } catch (error) {
    throw new Error(error);
  }
})();

//middleware
app.use(express.json()); //recibir inf
app.use(cors()); //hab a otras app a realizar peticiones a nuesta app

const port = process.env.PORT || 3030;
app.use("/", router);

app.listen(port, () => {
  
});
