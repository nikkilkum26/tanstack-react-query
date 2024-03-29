import React, { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, getPosts } from "../api/posts";

const TabPrimary = () => {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    // queryFn:()=> Promise.reject("Network Fails")
  });
  const postMutation = useMutation({
    mutationFn: (payload) => {
        return createPost(payload)
      // return wait(1000).then(()=>POSTS.push({id:crypto.randomUUID(),title}))
    },
    onSuccess: () => {
      // Clearing / Invalidating old data in the post aka ['posts']
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const addNewPosts = () => {
    let payload={
        title:titleRef.current.value,
        body:bodyRef.current.value
    }
    postMutation.mutate(payload);
    titleRef.current.value = "";
    bodyRef.current.value = "";
  };
  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;
  return (
    <div>
      <h3>Tab 1</h3>
      <ul>
        {postsQuery.data.map((eachPosts) => (
          <li key={eachPosts.id}>{eachPosts.title}</li>
        ))}
      </ul>
      <hr />
      <section style={{ display: "flex", gap: "1rem", alignItems: "center" }}>

        <h4>Add New Post </h4>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>

        <label>Title </label>
        <input ref={titleRef} />
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <label>Body </label>
        <input ref={bodyRef} />
      </div>
        <button onClick={addNewPosts} disabled={postMutation.isPending}>
          Add
        </button>
      </section>
    </div>
  );
};

export default TabPrimary;
