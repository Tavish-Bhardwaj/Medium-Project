import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import {verify} from "hono/jwt"; 
import { blogSchema, updateBlogSchema } from "@tavishbhardwaj/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;

    },
    Variables:{
    jwtPayload: number;
  };
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader= c.req.header("authorization") || "";
    // const token = authHeader.split(" ")[1];
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if(user){
        
        c.set('jwtPayload', (user.id));
        await next();

    }else{
        c.status(403);
        return c.json({error: "unauthorized"})
    }

  next();
});

blogRouter.post("/blogs", async (c) => {
  const body = await c.req.json();
  const {success} = blogSchema.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({error: "invalid request"})
  }
  const authorId = c.get("jwtPayload");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog= await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId
    },
  });
  return c.json({
    id: blog.id
  })
});


    blogRouter.get("/blogs/:id", async (c) => {
        const id= await c.req.param("id");
        
        const prisma =  new PrismaClient({
            
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        try{
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
               

                },
                select:{
                  id: true,
                  title: true,
                  content: true,
                  author:{
                    select:{
                      name:true
                    }

                  }
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
    const {success} = updateBlogSchema.safeParse(body);
    if(!success){
      c.status(400);
      return c.json({error: "invalid request"})
    }
    const authorId = c.get("jwtPayload");
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
        authorId: authorId
      },
    });
    return c.json({
      id: blog.id
    })});
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
const blogs = await prisma.blog.findMany({
  select: {
    content: true,
    title: true,
    id: true,
    author: {
      select: {
        name: true
    }
  }
}
});

return c.json({
    blogs
})


    })

    