import { useState, useEffect } from "react";
import useSWR from "swr";

async function getTodos(url) {
  const res = await fetch(url);
  return await res.json();
}

export default function Todos() {
  const [todos, setTodos] = useState(null);
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
