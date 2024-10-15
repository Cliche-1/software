import React, { useState } from 'react';
import { Plus, Trash2, BarChart2 } from 'lucide-react';

interface Task {
  id: number;
  name: string;
  duration: number;
  dependencies: string;
}

const CPMCalculator: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Task 1', duration: 0, dependencies: '' },
  ]);
  const [criticalPath, setCriticalPath] = useState<string[]>([]);

  const addTask = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      name: `Task ${tasks.length + 1}`,
      duration: 0,
      dependencies: '',
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: number, field: keyof Task, value: string | number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task
      )
    );
  };

  const calculateCriticalPath = () => {
    // This is a simplified calculation and doesn't handle all cases
    const sortedTasks = [...tasks].sort((a, b) => a.id - b.id);
    const path: string[] = [];
    let maxDuration = 0;

    sortedTasks.forEach((task) => {
      const dependencies = task.dependencies.split(',').map((d) => d.trim());
      const dependencyDurations = dependencies.map(
        (dep) => tasks.find((t) => t.name === dep)?.duration || 0
      );
      const maxDependencyDuration = Math.max(0, ...dependencyDurations);

      if (maxDependencyDuration + task.duration > maxDuration) {
        maxDuration = maxDependencyDuration + task.duration;
        path.push(task.name);
      }
    });

    setCriticalPath(path);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Critical Path Method (CPM)</h2>
      <div className="mb-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center mb-2">
            <input
              type="text"
              value={task.name}
              onChange={(e) => updateTask(task.id, 'name', e.target.value)}
              className="mr-2 p-2 border rounded"
              placeholder="Task name"
            />
            <input
              type="number"
              value={task.duration}
              onChange={(e) => updateTask(task.id, 'duration', parseInt(e.target.value))}
              className="mr-2 p-2 border rounded w-20"
              placeholder="Duration"
            />
            <input
              type="text"
              value={task.dependencies}
              onChange={(e) => updateTask(task.id, 'dependencies', e.target.value)}
              className="mr-2 p-2 border rounded"
              placeholder="Dependencies (comma-separated)"
            />
            <button
              onClick={() => removeTask(task.id)}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addTask}
        className="mb-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        <Plus size={18} className="inline-block mr-1" /> Add Task
      </button>
      <button
        onClick={calculateCriticalPath}
        className="mb-4 ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <BarChart2 size={18} className="inline-block mr-1" /> Calculate Critical Path
      </button>
      {criticalPath.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Critical Path:</h3>
          <p>{criticalPath.join(' → ')}</p>
        </div>
      )}
    </div>
  );
};

export default CPMCalculator;