import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import {verify} from "hono/jwt"; 

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;

    },
    Variables:{
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader= c.req.header("authorization") || "";
    const token = authHeader.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if(user){
        c.set('userId', JSON.stringify(user.id));
        next();

    }else{
        c.status(403);
        return c.json({error: "unauthorized"})
    }

  next();
});

blogRouter.post("/blogs", async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog= await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: parseInt(authorId),
    },
  });
  return c.json({
    id: blog.authorId
  })
});


    blogRouter.get("/blogs", async (c) => {
        const body= await c.req.json();
        const prisma =  new PrismaClient({
            
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        try{
        const blog = await prisma.blog.findFirst({
            where: {
                id: body.id
            }
        })
        
        return c.json({
            
            blog
        })
        
    }
        catch{
            c.status(411);
            return c.json({
                message: "something went wrong."
            })
        }
    });
        

blogRouter.put("/blogs", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog= await prisma.blog.update({
        where:{
            id: body.id
        },
      data: {
        title: body.title,
        content: body.content,
        authorId: 1,
      },
    });
    return c.json({
      id: blog.authorId
    })});
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
const blogs = await prisma.blog.findMany();

return c.json({
    blogs
})


    })
