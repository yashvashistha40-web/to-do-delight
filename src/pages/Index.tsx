import { useState, useEffect } from 'react';
import { taskApi, Task } from '@/lib/api';
import AddTaskForm from '@/components/todo/AddTaskForm';
import TodoList from '@/components/todo/TodoList';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2 } from 'lucide-react';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskApi.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: 'Error',
        description: 'Failed to load tasks. Make sure your API is running.',
        variant: 'destructive',
      });
      // Set empty tasks for demo mode
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (title: string) => {
    try {
      setIsAdding(true);
      const newTask = await taskApi.createTask({ title });
      setTasks((prev) => [newTask, ...prev]);
      toast({
        title: 'Task added',
        description: 'Your new task has been created.',
      });
      fetchTasks()
    } catch (error) {
      console.error('Error adding task:', error);
      // Demo mode: add locally
      const demoTask: Task = {
        id: Date.now().toString(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [demoTask, ...prev]);
      toast({
        title: 'Task added (demo)',
        description: 'Running in demo mode - connect your API to persist tasks.',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      setLoadingTaskId(id);
      await taskApi.updateTask(id, { completed });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, completed } : task))
      );
    } catch (error) {
      console.error('Error updating task:', error);
      // Demo mode: update locally
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, completed } : task))
      );
    } finally {
      setLoadingTaskId(null);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      setLoadingTaskId(id);
      await taskApi.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast({
        title: 'Task deleted',
        description: 'The task has been removed.',
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      // Demo mode: delete locally
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast({
        title: 'Task deleted (demo)',
        description: 'Running in demo mode.',
      });
    } finally {
      setLoadingTaskId(null);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        {/* Header */}
        <header className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <CheckCircle2 className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            My Tasks
          </h1>
          <p className="text-muted-foreground">
            {totalCount === 0
              ? 'Start adding tasks to stay organized'
              : `${completedCount} of ${totalCount} tasks completed`}
          </p>
        </header>

        {/* Add Task Form */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <AddTaskForm onAdd={handleAddTask} isLoading={isAdding} />
        </div>

        {/* Task List */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <TodoList
              tasks={tasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              loadingTaskId={loadingTaskId}
            />
          )}
        </div>

        {/* Footer hint */}
        <footer className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-muted-foreground/70">
            Set <code className="text-xs bg-muted px-1.5 py-0.5 rounded">VITE_API_URL</code> to connect to your backend
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
