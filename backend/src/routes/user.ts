import {Hono} from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import {signinSchema, signupSchema} from "@tavishbhardwaj/medium-common";





export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;

    };
}

>();


userRouter.post("/signup", async (c)=>{
    const prisma =  new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
        
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const {success}= signupSchema.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({error: "invalid request"})
    }
    const user= await prisma.user.create({
        data: {
            name: body.name,
            email:body.email,
            password: body.password

        }
    });
    const token = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({
        jwt: token
    });
    })

    userRouter.post("/signin", async(c)=>{
        const prisma =  new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();
        const {success}= signinSchema.safeParse(body);
        if(!success){
            c.status(400);
            return c.json({error: "invalid request"})
        }
        const user = await prisma.user.findUnique({

            where: {
                email: body.email,
                password: body.password
            }

        })
        if(!user){
            c.status(403);
            return c.json({error: "unauthorized"});
        }
        else{
            const token = await sign({id: user.id}, c.env.JWT_SECRET);
            
            return c.json({
                jwt: token
            })
        }
        })
    
    
