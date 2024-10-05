import { useTodoControllerCreate, useTodoControllerFindAll, getTodoControllerFindAllKey } from '../../orval/todos/todos'; // パスは実際の生成場所に合わせて調整してください
import { useSWRConfig } from 'swr';
import { TodoDto } from '../../orval/schemas'; // 必要に応じてインポートパスを調整

export function useTodos() {
  const { mutate } = useSWRConfig();
  const { data: todos, error, isLoading } = useTodoControllerFindAll();
  const { trigger: createTodo, isMutating: isCreating } = useTodoControllerCreate();

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


  return {
    todos: todos?.data,
    isLoading,
    error,
    addTodo,
    isCreating
  };
}
