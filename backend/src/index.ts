import sls from "serverless-http";
import "./env"; // Must be the first import
import app from "./Server";
import logger from "./shared/Logger";

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  logger.info("Express server started on port: " + port);
});

module.exports.handler = sls(app);
