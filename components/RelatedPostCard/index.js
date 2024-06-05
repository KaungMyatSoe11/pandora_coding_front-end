import { truncateText } from "@/utils/truncateText";
import Link from "next/link";

const RelatedPostCard = ({ post }) => {
  return (
    <Link
      href={`/post/${post.id}`}
      className="group flex items-center space-x-4"
      prefetch={false}
    >
      <div className="space-y-1">
        <h4 className="text-sm font-medium group-hover:underline">
          {post.title}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {truncateText(post.content)}
        </p>
      </div>
    </Link>
  );
};

export default RelatedPostCard;
