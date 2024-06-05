"use client";

import { api } from "@/utils/api_config";
import { useSession } from "next-auth/react";
import { createContext, useState } from "react";

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const { data: authData } = useSession();
  const [displayedPosts, setDisplayedPosts] = useState({ posts: [] });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const getAllPost = async (page, pageSize = 8) => {
    const { data } = await api.get(
      `/public/post?page=${page}&pageSize=${pageSize}`,
    );
    if (page > 1) {
      setDisplayedPosts({
        posts: [...displayedPosts.posts, ...data.posts],
        totalPosts: data.totalPosts,
      });
    } else {
      setDisplayedPosts({
        posts: [...data.posts],
        totalPosts: data.totalPosts,
      });
    }
    console.log(page, data);
    return data;
  };

  const getAllPostAdmin = async ({ pageIndex, pageSize }) => {
    const { data } = await api.get(
      `/post?page=${pageIndex + 1}&pageSize=${pageSize}`,
      {
        headers: { Authorization: `Bearer ${authData?.user.token}` },
      },
    );
    if (pageIndex > data.totalPages) {
      setPagination({ ...pagination, pageIndex: data.totalPages });
    }
    return data;
  };

  const deletePost = async ({ id }) => {
    console.log(id);
    const { data } = await api.delete(`/post/${id}`, {
      headers: { Authorization: `Bearer ${authData?.user.token}` },
    });

    return data;
  };

  const createPost = async (postData) => {
    const { data } = await api.post("/post", postData, {
      headers: { Authorization: `Bearer ${authData?.user.token}` },
    });
    return data;
  };
  const editPost = async (postData) => {
    const { data } = await api.put(`/post/${postData.id}`, postData, {
      headers: { Authorization: `Bearer ${authData?.user.token}` },
    });
    return data;
  };
  const getPost = async (postId) => {
    const { data } = await api.get(`/public/post/${postId}`);
    return data;
  };

  return (
    <PostContext.Provider
      value={{
        getAllPost,
        displayedPosts,
        getAllPostAdmin,
        deletePost,
        pagination,
        setPagination,
        createPost,
        editPost,
        getPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
