import React, { useEffect, useState } from "react";
import axios from "axios"; // 🔁 direct axios import
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";

function FeedList() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sorted);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <CreatePost onPostCreated={fetchPosts} />
      <h2 className="text-xl font-bold mt-6">Recent Posts</h2>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default FeedList;
