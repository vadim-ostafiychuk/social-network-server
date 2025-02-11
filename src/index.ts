import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { createYoga } from "graphql-yoga";
import createYogaSchemaAsync from "./graphql/schema";
import helmet from "helmet";
import { initORM } from "./db";

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

const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

async function startServer() {
  try {
    await initORM({});
    console.log("DB Connected!");

    const schema = await createYogaSchemaAsync();

    const yoga = createYoga({
      schema,
    });

    app.use(yoga.graphqlEndpoint, yoga);

    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

startServer();
