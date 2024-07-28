import { Hono } from "hono";
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import {userRouter} from "./routes/user";
import { cors } from "hono/cors";
import {blogRouter} from "./routes/blog"
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
// Middlewares:
app.use("/*",cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);




export default app;


// This is the comment to be pushed while continuing the medium build and a break of today for the travel purpose.
// besides today, India won the final match against South Africa in the T20 World Cup.
// 13.2 AMA session done.
// final backend code for the blog.