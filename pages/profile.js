import React from "react";

export default function Profile({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: { user: { name: "Darwin" } },
  };
}
