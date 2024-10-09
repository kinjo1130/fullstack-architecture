import { useTodoControllerCreate, useTodoControllerFindAll, getTodoControllerFindAllKey, useTodoControllerUpdate, useTodoControllerDelete } from '../../orval/todos/todos'; // パスは実際の生成場所に合わせて調整してください
import { useSWRConfig } from 'swr';
import { TodoDto } from '../../orval/schemas'; // 必要に応じてインポートパスを調整

export function useTodos() {
  const { mutate } = useSWRConfig();
  const { data: todos, error, isLoading } = useTodoControllerFindAll();
  const { trigger: createTodo, isMutating: isCreating } = useTodoControllerCreate();
  const { trigger: update, isMutating: isUpdating } = useTodoControllerUpdate();
  const { trigger: deleteTodoList, isMutating: isDeleting } = useTodoControllerDelete();

  const addTodo = async (title: string) => {
    try {
      const result = await createTodo({ title });
      mutate(getTodoControllerFindAllKey());
      return result;
    } catch (error) {
      console.error('Failed to create todo:', error);
      throw error;
    }
  };
  const updateTodo = async (todo: TodoDto) => {
    try {
      const result = await update(todo);
      mutate(getTodoControllerFindAllKey());
      return result;
    } catch (error) {
      console.error('Failed to update todo:', error);
      throw error;
    }
  }
  const deleteTodo = async (id: string) => {
    try {
      const numberId = parseInt(id);
      const result = await deleteTodoList(numberId);
      mutate(getTodoControllerFindAllKey());
      return result;
    } catch (error) {
      console.error('Failed to delete todo:', error);
      throw error;
    }
  }


  return {
    todos: todos?.data,
    isLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    isCreating
  };
}
