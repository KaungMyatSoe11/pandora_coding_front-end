import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { PostContext } from "@/store/postProvider";
import { toast } from "sonner";
import { Edit } from "lucide-react";

const schema = z.object({
  title: z.string().nonempty(),
  content: z.string().nonempty(),
});

const PostEditForm = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { editPost, pagination } = useContext(PostContext);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });

  const QueryClient = useQueryClient();
  const mutEditPost = useMutation({
    mutationFn: editPost,
    mutationKey: ["edit-post"],
    onSuccess: (data) => {
      console.log(data);
      const { post } = data.data;
      if (data.status) {
        setIsLoading(false);
        form.setValue("title", post.title);
        setIsOpen(false);
        toast.success("Post Updated Successfully!");
      }
      QueryClient.invalidateQueries(["admin-post", pagination]);
    },
    onError: (e) => {
      setIsLoading(false);
      toast.error("Something Error!");
    },
  });

  const onSubmit = (values) => {
    console.log(values);
    setIsLoading(true);
    mutEditPost.mutate({ ...values, id: post.id });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Edit className="h-4 w-4 text-yellow-400" />
          <span className="sr-only">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update Post</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <br />
                    <FormControl>
                      <textarea
                        {...field}
                        rows={20}
                        className="w-full border"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Update Post</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditForm;
