import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Hello from "./hello";

import fs from "fs/promises";
import path from "path";
import Link from "next/link";

const PageHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default function Home({ products }) {
  return (
    <>
      <PageHead title="Product" />
      <Hello name="Darwin" />
      {products.map((product) => {
        return (
          <p key={product.id}>
            <Link href={`/${product.id}`}>{product.title}</Link>
          </p>
        );
      })}
    </>
  );
}

export async function getStaticProps() {
  console.log("Regenerating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 3,
  };
}
