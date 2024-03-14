import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { ConfigSequelize } from "./sequelize";
import { RegisterRoutes } from "./routes";
import { handle404, handleError } from "./errorHandler";
import passport from "passport";
import session from "express-session";
import { routes } from "./routes/authentication.route";
import { configPassport } from "./config/passport.config";
import createMemoryStore from "memorystore";
const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
// Allow Cross-Origin requests
const sessionConfig = {
  resave: false,
  saveUninitialized: true,
  secret: "memorystore",
};
if (["production", "staging"].includes(process.env.NODE_ENV || "")) {
  app.set("trust proxy", 1); // trust first proxy
  const MemoryStore = createMemoryStore(session);
  app.use(
    session({
      ...sessionConfig,
      store: new MemoryStore({}),
    })
  );
} else {
  app.use(session(sessionConfig));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setup Sequelize connection with the database
const config = new ConfigSequelize();
config.setupConnection();

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use(passport.initialize());
app.use(passport.session());
configPassport();

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj: any, cb) {
  cb(null, obj);
});

app.use("/auth", routes);
// Add APIs
RegisterRoutes(app);

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const staticDir = path.join(__dirname, "/assets");
(global as any).assetDir = staticDir;
app.use(express.static(staticDir));
// const viewsDir = path.join(__dirname, "views");
// app.set("views", viewsDir);
// app.get("*", (_req: Request, res: Response) => {
//   res.sendFile("index.html", { root: viewsDir });
// });

// Handle error
handle404(app);
handleError(app);

export default app;
