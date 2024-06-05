"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { PostContext } from "@/store/postProvider";
import { useToast } from "../ui/use-toast";

const DeleteButton = ({ id }) => {
  const { deletePost, pagination } = useContext(PostContext);
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const MutDeletePost = useMutation({
    mutationFn: deletePost,
    mutationKey: ["deleteTrainee", id],
    onSuccess: (data, variables, context) => {
      console.log(data);
      toast({
        description: "Sunday, December 03, 2023 at 9:00 AM",
        variant: "",
      });
      queryClient.invalidateQueries(["admin-post", pagination]);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onDeleteHandler = () => {
    MutDeletePost.mutate({ id });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <TrashIcon className="h-4 w-4 text-red-600" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle> Are you sure Delete this post?</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="Destructive" onClick={onDeleteHandler}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
