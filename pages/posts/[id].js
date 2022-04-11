import React from "react";
import { useRouter } from "next/router";

export default function Post({ post }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Post No. {id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const req = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const data = await req.json();

  return {
    props: { post: data },
  };
}
