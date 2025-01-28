import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { createYoga } from "graphql-yoga";
import yogaSchema from "./graphql/schema";
import helmet from "helmet";
import { MikroORM } from "@mikro-orm/postgresql";
import mikroORMConfig from "./mikro-orm.config";

dotenv.config();

const app: Application = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "style-src": ["'self'", "unpkg.com"],
        "script-src": ["'self'", "unpkg.com", "'unsafe-inline'"],
        "img-src": ["'self'", "raw.githubusercontent.com"],
      },
    },
  })
);

const yoga = createYoga({
  schema: yogaSchema,
});

const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use(yoga.graphqlEndpoint, yoga);

MikroORM.init(mikroORMConfig)
  .then((res) => {
    console.log("DB Connected!");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
