"use client";
import { useTodoControllerFindAll, getTodoControllerFindAllKey, useTodoControllerCreate } from "@/orval/todos/todos";
import { TodoDto } from "@/orval/schemas";
import { useEffect, useState } from "react";
import { useTodos } from "./hooks/useTodos";

export default function Home() {
  const { todos, isLoading, error, addTodo, isCreating } = useTodos();

  if (error) return <div>failed to load</div>;
  if (isLoading || !todos) return <div>loading...</div>;

  return (
    <div>
      <h2>Todo app</h2>
      <form onSubmit={
        async (e) => {
          e.preventDefault();
          const title = (document.getElementById("todo") as HTMLInputElement).value;
          addTodo(title);
          // ここでフォームをクリアする
          (document.getElementById("todo") as HTMLInputElement).value = "";
        }
      }>
        <label htmlFor="todo">Todoを追加する</label>
        <input type="text" placeholder="Add todo" id="todo" className="border" />
        <button type="submit" disabled={isCreating}>Add</button>
      </form>
      <ul>
        {todos.map((todo: TodoDto) => (
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