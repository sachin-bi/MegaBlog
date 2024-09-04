import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

// these props data will get from appwite- you can add views , date,time, likes, etc
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getPreviewFile(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
