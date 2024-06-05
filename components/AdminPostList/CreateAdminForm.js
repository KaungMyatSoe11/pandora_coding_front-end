import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

const schema = z.object({
  title: z.string().nonempty(),
  content: z.string().nonempty(),
});

const CreateAdminForm = ({
  isCreatePostModalOpen,
  handleCloseCreatePostModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { createPost, pagination } = useContext(PostContext);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const QueryClient = useQueryClient();
  const mutCreatePost = useMutation({
    mutationFn: createPost,
    mutationKey: ["create-post"],
    onSuccess: (data) => {
      QueryClient.invalidateQueries(["admin-post", pagination]);
      console.log(data);
      if (data.status) {
        setIsLoading(false);
        handleCloseCreatePostModal();
        form.reset();
        toast.success("Post Created Successfully!");
      }
    },
    onError: (e) => {
      setIsLoading(false);

      console.log(e);
    },
  });

  const onSubmit = (values) => {
    console.log(values);
    setIsLoading(true);
    mutCreatePost.mutate({ ...values });
  };

  return (
    <Dialog
      open={isCreatePostModalOpen}
      onOpenChange={handleCloseCreatePostModal}
    >
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new blog post.
              </DialogDescription>
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
              <Button type="submit">Create Post</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAdminForm;
