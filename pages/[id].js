import React from "react";
import fs from "fs/promises";
import path from "path";
import { useRouter } from "next/router";

export default function ProductDetails({ product }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <h1>{id}</h1>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
}

export async function getStaticProps({ params }) {
  const data = await getData();

  const product = data.products.find((product) => {
    return product.id === params.id;
  });

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product: product,
    },
    revalidate: 3,
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const paths = data.products.map((product) => {
    return { params: { id: `${product.id}` } };
  });

  return {
    paths,
    fallback: false,
  };
}
