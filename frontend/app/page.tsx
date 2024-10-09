"use client";
import { TodoDto } from "@/orval/schemas";
import { useState } from "react";
import { useTodos } from "./hooks/useTodos";

export default function Home() {
  const { todos, isLoading, error, addTodo, updateTodo, deleteTodo, isCreating } = useTodos();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  if (error) return <div>failed to load</div>;
  if (isLoading || !todos) return <div>loading...</div>;

  const handleEdit = (todo: TodoDto) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const handleUpdate = async () => {
    if (editingId === null) return;
    const todoToUpdate = todos.find(t => t.id === editingId);
    if (todoToUpdate) {
      await updateTodo({ ...todoToUpdate, title: editText });
      setEditingId(null);
      setEditText("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (document.getElementById("todo") as HTMLInputElement).value;
    await addTodo(title);
    (document.getElementById("todo") as HTMLInputElement).value = "";
  };

  return (
    <div>
      <h2>Todo app</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Todoを追加する</label>
        <input type="text" placeholder="Add todo" id="todo" className="border" />
        <button type="submit" disabled={isCreating}>追加</button>
      </form>
      <ul>
        {todos.map((todo: TodoDto) => (
          <li key={todo.id} className="flex items-center space-x-2">
            {/* <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
            /> */}
            {editingId === todo.id ? (
              <>
                <input 
                  type="text" 
                  value={editText} 
                  onChange={(e) => setEditText(e.target.value)} 
                  className="border"
                />
                <button onClick={handleUpdate}>更新</button>
                <button onClick={() => setEditingId(null)}>キャンセル</button>
              </>
            ) : (
              <>
                <span className={todo.completed ? "font-bold" :""}>{todo.title}</span>
                <button onClick={() => handleEdit(todo)}>編集</button>
                <button onClick={() => deleteTodo(todo.id)}>削除</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}