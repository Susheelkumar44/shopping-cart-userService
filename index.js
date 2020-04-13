const express = require("express")
const bodyParser = require("body-parser")
const usersRouter = require("./users/router/router")
const logger = require("./utilities/logger");
const cors = require('cors')

const app = express()
const port = process.env.PORT || 1235

require("./config/mongoose")(app);
app.use(cors());
app.use(bodyParser.json());
app.use("/user", usersRouter);

app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
})