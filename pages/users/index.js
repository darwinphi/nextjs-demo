import Head from "next/head";
import React from "react";

export default function Users({ users }) {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <div>
        <h1>Users</h1>
        {users.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const req = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await req.json();

  return {
    props: { users: data },
  };
}
