import { Check, Trash2 } from 'lucide-react';
import { Task } from '@/lib/api';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const TodoItem = ({ task, onToggle, onDelete, isLoading }: TodoItemProps) => {
  return (
    <div
      className={cn(
        "group flex items-center gap-4 p-4 bg-card rounded-lg shadow-card transition-all duration-200 hover:shadow-soft task-enter",
        isLoading && "opacity-50 pointer-events-none"
      )}
    >
      <button
        onClick={() => onToggle(task.id, !task.completed)}
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          task.completed
            ? "bg-success border-success"
            : "border-muted-foreground/30 hover:border-primary"
        )}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed && <Check className="w-4 h-4 text-success-foreground" />}
      </button>

      <span
        className={cn(
          "flex-1 text-base transition-all duration-200",
          task.completed && "line-through text-muted-foreground"
        )}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 p-2 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
        aria-label="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TodoItem;
