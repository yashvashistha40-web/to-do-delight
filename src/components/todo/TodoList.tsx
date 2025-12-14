import { Task } from '@/lib/api';
import TodoItem from './TodoItem';
import { ClipboardList } from 'lucide-react';

interface TodoListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  loadingTaskId?: string | null;
}

const TodoList = ({ tasks, onToggle, onDelete, loadingTaskId }: TodoListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <ClipboardList className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">No tasks yet</h3>
        <p className="text-muted-foreground">Add your first task to get started</p>
      </div>
    );
  }

  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="space-y-6">
      {incompleteTasks.length > 0 && (
        <div className="space-y-3">
          {incompleteTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              isLoading={loadingTaskId === task.id}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide px-1">
            Completed ({completedTasks.length})
          </h3>
          {completedTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              isLoading={loadingTaskId === task.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
