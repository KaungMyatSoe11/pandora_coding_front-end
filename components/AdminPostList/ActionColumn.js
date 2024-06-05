"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import DeleteButton from "./DeleteButton";
import PostEditForm from "./PostEditForm";

const ActionColumn = ({ post }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <PostEditForm
          post={{
            id: post.getValue("id"),
            title: post.getValue("title"),
            content: post.getValue("content"),
          }}
        />

        <DeleteButton id={post.getValue("id")} />
      </div>
    </>
  );
};

export default ActionColumn;
