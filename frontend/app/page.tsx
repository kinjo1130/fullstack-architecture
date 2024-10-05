"use client";
import { useTodoControllerFindAll, getTodoControllerFindAllKey } from "@/orval/todos/todos";
import {getTodoControllerFindAllResponseMock} from "@/orval/todos/todos.msw";
import { TodoDto } from "@/orval/schemas";
import { useEffect, useState } from "react";

export default function Home() {
  const {
    data: todos,
    error,
    isLoading
  } = useTodoControllerFindAll();

  if (error) return <div>failed to load</div>;
  if (isLoading || !todos) return <div>loading...</div>;

  // const [todos, setTodos] = useState<TodoDto[]>([]);

  // useEffect(() => {
  //   // クライアントサイドでのみモックデータを取得
  //   setTodos(getTodoControllerFindAllResponseMock());
  // }, []);

  return (
    <div>
      <h2>Todo app</h2>
      <form>
        <label htmlFor="todo">Todoを追加する</label>
        <input type="text" placeholder="Add todo" id="todo" className="border" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.data.map((todo: TodoDto) => (
          <li key={todo.id}>
            <input type="checkbox" />
            <span>{todo.title}</span>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}