import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddTaskFormProps {
  onAdd: (title: string) => void;
  isLoading?: boolean;
}

const AddTaskForm = ({ onAdd, isLoading }: AddTaskFormProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && !isLoading) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        disabled={isLoading}
        className={cn(
          "w-full px-5 py-4 pr-14 bg-card rounded-lg shadow-card",
          "border border-transparent focus:border-primary/30 focus:ring-2 focus:ring-primary/10",
          "placeholder:text-muted-foreground/60 text-foreground",
          "transition-all duration-200 outline-none",
          isLoading && "opacity-50"
        )}
      />
      <button
        type="submit"
        disabled={!title.trim() || isLoading}
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2",
          "w-10 h-10 rounded-md flex items-center justify-center",
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed",
          "transition-all duration-200"
        )}
        aria-label="Add task"
      >
        <Plus className="w-5 h-5" />
      </button>
    </form>
  );
};

export default AddTaskForm;
