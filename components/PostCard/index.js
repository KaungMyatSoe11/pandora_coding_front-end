import Image from "next/image";
import Link from "next/link";
import post_img from "@/assets/images/post-img.jpg";

const PostCard = ({ post }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg dark:bg-gray-600">
      <Link href={`post/${post.id}`} prefetch={false}>
        <Image
          src={post_img}
          alt="Blog Post 1"
          width={300}
          height={200}
          className="h-48 w-full object-cover transition-all group-hover:scale-105"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            {post.title}
          </h3>
          {/* <p className="mt-2 text-gray-600 dark:text-gray-400">
            Discover the beauty and serenity of the great outdoors in this
            captivating blog post.
          </p> */}
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
