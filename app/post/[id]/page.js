"use client";
import RelatedPostCard from "@/components/RelatedPostCard";
import { PostContext } from "@/store/postProvider";
import Link from "next/link";
import { useContext } from "react";
import { useQuery } from "react-query";

export default function PostDetail({ params }) {
  const { id } = params;

  console.log(id);

  const { getPost, getAllPost } = useContext(PostContext);
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    keepPreviousData: true,
  });
  const { data: relatedPost } = useQuery({
    queryKey: ["related-posts"],
    queryFn: () => getAllPost(1, 3),
    keepPreviousData: true,
  });

  console.log(data);
  return (
    <div className="flex flex-col">
      <section className="bg-gray-100 py-12 md:py-16 lg:py-20 dark:bg-gray-800">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight leading-[5rem]  sm:text-[2.25rem] md:text-[3rem]">
              {data?.post.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400">
              <div className="h-8 w-8 rounded-full bg-gray-300"></div>
              <div>{data?.post.user.name}</div>
              <div>•</div>
              <div>{new Date(data?.post.createdAt).toDateString()}</div>
            </div>
          </div>
        </div>
      </section>
      <div className="container grid grid-cols-1 gap-8 py-12 md:py-16 lg:py-20 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <article className="prose prose-gray max-w-none dark:prose-invert">
            {data?.post.content}
          </article>
        </div>
        {relatedPost?.posts && (
          <div className="space-y-8">
            <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-950">
              <h3 className="text-lg font-bold">Related Posts</h3>
              <div className="mt-4 space-y-4">
                {relatedPost?.posts
                  .filter((post) => post.id !== id)
                  .map((post) => (
                    <RelatedPostCard key={post.id} post={post} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
