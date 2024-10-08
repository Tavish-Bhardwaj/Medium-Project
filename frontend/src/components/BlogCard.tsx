import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  id: number;
  publishedDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id
}: BlogCardProps) => {
  return (<Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-300 pb-4 w-screen max-w-screen-lg cursor-pointer">
      <div className="flex">
        <div className="flex justify-center flex-col">
          <Avatar name={authorName} />
        </div>
        <div className="font-extralight pl-2">{authorName}</div>
        <div className="flex justify-center flex-col pl-2" ><Circle /> </div>
        <div className="pl-2 font-thin text-slate-400">{publishedDate}</div>
      </div>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
      <div className="text-slate-500 text-sm font-thin">{`${Math.ceil(content.length / 100)} minutes(s) read`}</div>
      
    </div>
    </Link>
  );
};

export function Avatar({ name, size="small" }: { name: string, size?: "small" | "big" }) {
  return (
    <div className={`realtive inline-flex items-center justify-center ${size==="small"?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
      <span className={` ${size=== "small"? "text-sx":"etxt-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
      </span>
    </div>
  );
}


function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500 ">

    </div>
}