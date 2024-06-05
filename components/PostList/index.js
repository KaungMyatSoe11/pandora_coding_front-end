"use client";
import { PostContext } from "@/store/postProvider";
import { useContext, useState } from "react";
import PostCard from "../PostCard";
import { useQuery } from "react-query";
import { Button } from "../ui/button";

const PostList = () => {
  const { getAllPost, displayedPosts } = useContext(PostContext);
  const [page, setPage] = useState(1);

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getAllPost(page),
    refetchOnWindowFocus: false,
  });
  console.log(displayedPosts);
  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <p>loading</p>
        ) : (
          displayedPosts.posts.map((post) => (
            <PostCard key={`pl-${post.id}`} post={post} />
          ))
        )}
      </div>

      <div
        className={`mt-8 flex justify-center ${displayedPosts.posts.length >= displayedPosts.totalPosts && "hidden"}`}
      >
        <Button onClick={loadMore}>Load More</Button>
      </div>
    </div>
  );
};

export default PostList;
