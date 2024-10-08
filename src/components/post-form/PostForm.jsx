import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "active",
      },
    });

    
    // userData will come from store reducer named auth
    const userData = useSelector((state) => state.auth.userData);
    
    const navigate = useNavigate();


  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;    //mention await in front of appwriteService.uploadFile(data.image[0]) // debug done await required
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
        // delete old image from storage //in database it is termed as featuredImage(this is id of file in storage)
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      //  createPost({ title, slug, content, featuredImage, status, userId })
      const file = await appwriteService.uploadFile(data.image[0]);
       
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        console.log("data", userData);
        
        const dbPost = await appwriteService.createPost({...data, userId: userData.$id });
        
        console.log("userid", userData.$id);
        // console.log("dbPost", dbPost);
        

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }else {
          console.error('Error creating post:', dbPost);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      // const slug = value.toLowerCase().replace(/\s+/g, "-");
      // setValue("slug", slug);
      // return slug;     //or below-one
      return value
        .trim() //remove leading and trailing spaces  eg. "  hello world  " -> "hello world"
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-") // Removes any non-alphanumeric characters (except spaces)
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getPreviewFile(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
