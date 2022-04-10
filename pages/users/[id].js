import React from "react";
import { useRouter } from "next/router";

export default function User({ user }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>User No. {id}</h1>
      <p>Name: {user.name}</p>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const req = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  );
  const data = await req.json();

  return {
    props: { user: data },
  };
}

export async function getStaticPaths() {
  const req = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await req.json();

  const paths = data.map((user) => {
    return { params: { id: `${user.id}` } };
  });

  return {
    paths,
    fallback: false,
  };
}
