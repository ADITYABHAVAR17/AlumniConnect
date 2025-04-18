import React, { useState } from "react";
import axios from "axios";

function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // assuming token is stored here

      await axios.post(
        "/api/posts",
        {
          title,
          body,
          tags: tags.split(",").map((t) => t.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onPostCreated();
      setTitle("");
      setBody("");
      setTags("");
    } catch (err) {
      alert("Error creating post");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-white p-4 rounded shadow"
    >
      <input
        type="text"
        placeholder="Post title"
        className="w-full p-2 border"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Write something..."
        className="w-full p-2 border"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      ></textarea>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full p-2 border"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Post
      </button>
    </form>
  );
}

export default CreatePost;
