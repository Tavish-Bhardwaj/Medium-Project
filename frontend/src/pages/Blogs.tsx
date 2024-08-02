import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs= ()=>{

    const {loading, blogs}= useBlogs();

    if(loading){
        return <div>
            <Appbar/>
            <div className="flex justify-center ">
                <div className="text-2xl font-semibold">
                    Loading...
                </div>
            </div>
        </div>
    }
    return <div>

    <Appbar/>
     <div className="flex justify-center">
    <div>
        {blogs.map(blog =><BlogCard
        id={blog.id}
        authorName={blog.author.name}
        title={blog.title} 
        content={blog.content}
        publishedDate={blog.publishedAt}
        />)}
        {/* <BlogCard
        authorName={"Tavish"}
        title={"How an ugly Single website makes $5000 a month without Affiliate marketing"}
        content={"No need to create a fancy and modern  website with hundreds of pages to make money online. - Making money online is the dream for many people accross the globe.this is also some extra text i am just writing to check how it impacts the minutes read. currently it is showing the blog as a 2 minutes read but now depends how many minutes read it is for normal people according to the logic written by me here. "}
        publishedDate={"28 July 2024"}
        />
        <BlogCard
        authorName={"Tavish"}
        title={"How an ugly Single website makes $5000 a month without Affiliate marketing"}
        content={"No need to create a fancy and modern  website with hundreds of pages to make money online. - Making money online is the dream for many people accross the globe.this is also some extra text i am just writing to check how it impacts the minutes read. currently it is showing the blog as a 2 minutes read but now depends how many minutes read it is for normal people according to the logic written by me here. "}
        publishedDate={"28 July 2024"}
        />
        <BlogCard
        authorName={"Tavish"}
        title={"How an ugly Single website makes $5000 a month without Affiliate marketing"}
        content={"No need to create a fancy and modern  website with hundreds of pages to make money online. - Making money online is the dream for many people accross the globe.this is also some extra text i am just writing to check how it impacts the minutes read. currently it is showing the blog as a 2 minutes read but now depends how many minutes read it is for normal people according to the logic written by me here. "}
        publishedDate={"28 July 2024"}
        />
        <BlogCard
        authorName={"Tavish"}
        title={"How an ugly Single website makes $5000 a month without Affiliate marketing"}
        content={"No need to create a fancy and modern  website with hundreds of pages to make money online. - Making money online is the dream for many people accross the globe.this is also some extra text i am just writing to check how it impacts the minutes read. currently it is showing the blog as a 2 minutes read but now depends how many minutes read it is for normal people according to the logic written by me here. "}
        publishedDate={"28 July 2024"}
        /> */}
    </div>
        </div>
        </div>
}