import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Hello from "./hello";

import fs from "fs/promises";
import path from "path";

export default function Home({ products }) {
  return (
    <div>
      <Hello name="Darwin" />
      {products.map((prop) => {
        return <p key={prop.id}>{prop.title}</p>;
      })}
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
  };
}
