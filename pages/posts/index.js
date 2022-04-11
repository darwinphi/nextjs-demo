import Head from "next/head";
import React from "react";

export default function Posts({ posts }) {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <div>
        <h1>Posts</h1>
        {posts.map((post) => (
          <p key={post.id}>{post.title}</p>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const req = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await req.json();

  return {
    props: { posts: data },
  };
}
