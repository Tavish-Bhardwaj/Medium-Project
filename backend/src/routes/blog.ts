import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.use("/a", async (c, next) => {
  next();
});

blogRouter.post("/blogs", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog= await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: 1,
    },
  });
  return c.json({
    id: blog.authorId;
  })
});

blogRouter.get("/", async (c) => {});
blogRouter.put("/", async (c) => {});
blogRouter.get("/bulk", async (c) => {});
