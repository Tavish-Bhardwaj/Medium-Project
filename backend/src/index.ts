import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
// this is a middleware for all the user Routes.
app.use("api/v1/user/*",async (c,next) =>{


})


// this is a middleware for all the authentication.
app.use("api/v1,blog/*",async (c,next) =>{
  const header = c.req.header("authorization") || "";
const token = header.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET);
  if(response.id){
    await next();
  }else{
    c.status(403)
    return c.json({error: "unauthorized"})
  }
})

// Normal Hono Routes:
app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
//@ts-ignore

  const body = await c.req.json();
  const user = await prisma.user.create({
    data: {
      
      email: body.email,
      password: body.password,
      name: body.name
      
    },
  });
  
  const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  return c.json({
    jwt: token
  });
});
app.post("/api/v1/signin", async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  });

  if(!user){
    return c.json({
      error: "User Not Found with the given credentials"
    });

  }

  const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
  return c.json({
    jwt
  })


});
app.post("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});
app.put("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});
app.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello Hono!");
});

export default app;


// This is the comment to be pushed while continuing the medium build and a break of today for the travel purpose.
// besides today, India won the final match against South Africa in the T20 World Cup.
// 13.2 AMA session done.
// final backend code for the blog.