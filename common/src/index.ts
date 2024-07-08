import {z} from "zod";

export const signupSchema= z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})


export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})


export const blogSchema = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogSchema = z.object({
    title: z.string(),
    content: z.string(), 
    id: z.number()
})
export type SignupSchema = z.infer<typeof signupSchema>;
export type SigninSchema = z.infer<typeof signinSchema>;
export type BlogSchema = z.infer<typeof blogSchema>;
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;