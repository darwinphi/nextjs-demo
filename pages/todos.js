import { useState, useEffect } from "react";
import useSWR from "swr";

async function getTodos(url) {
  const res = await fetch(url);
  return await res.json();
}

export default function Todos({ todosData }) {
  const [todos, setTodos] = useState(todosData);
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/todos",
    getTodos
  );

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  if (error) return <p>Something went wrong.</p>;
  if (!data || !todos) return <p>Loading...</p>;

  return (
    <div>
      <ul>
        {todos &&
          todos.map((todo) => {
            return <li key={todo.id}>{todo.title}</li>;
          })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();

  const todosData = data.map((d) => {
    return { id: d.id, title: d.title };
  });

  return {
    props: {
      todosData: todosData,
    },
  };
}
