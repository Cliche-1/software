import React, { useState } from 'react';
import { Plus, Trash2, BarChart2 } from 'lucide-react';

interface Task {
  id: number;
  name: string;
  optimistic: number;
  mostLikely: number;
  pessimistic: number;
}

const PERTCalculator: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Task 1', optimistic: 0, mostLikely: 0, pessimistic: 0 },
  ]);
  const [pertResults, setPertResults] = useState<{ name: string; expected: number; variance: number }[]>([]);

  const addTask = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      name: `Task ${tasks.length + 1}`,
      optimistic: 0,
      mostLikely: 0,
      pessimistic: 0,
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

  const calculatePERT = () => {
    const results = tasks.map((task) => {
      const expected = (task.optimistic + 4 * task.mostLikely + task.pessimistic) / 6;
      const variance = Math.pow((task.pessimistic - task.optimistic) / 6, 2);
      return {
        name: task.name,
        expected: parseFloat(expected.toFixed(2)),
        variance: parseFloat(variance.toFixed(2)),
      };
    });
    setPertResults(results);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">PERT Calculator</h2>
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
              value={task.optimistic}
              onChange={(e) => updateTask(task.id, 'optimistic', parseInt(e.target.value))}
              className="mr-2 p-2 border rounded w-20"
              placeholder="Optimistic"
            />
            <input
              type="number"
              value={task.mostLikely}
              onChange={(e) => updateTask(task.id, 'mostLikely', parseInt(e.target.value))}
              className="mr-2 p-2 border rounded w-20"
              placeholder="Most Likely"
            />
            <input
              type="number"
              value={task.pessimistic}
              onChange={(e) => updateTask(task.id, 'pessimistic', parseInt(e.target.value))}
              className="mr-2 p-2 border rounded w-20"
              placeholder="Pessimistic"
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
        onClick={calculatePERT}
        className="mb-4 ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <BarChart2 size={18} className="inline-block mr-1" /> Calculate PERT
      </button>
      {pertResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">PERT Results:</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Task</th>
                <th className="border p-2">Expected Duration</th>
                <th className="border p-2">Variance</th>
              </tr>
            </thead>
            <tbody>
              {pertResults.map((result, index) => (
                <tr key={index}>
                  <td className="border p-2">{result.name}</td>
                  <td className="border p-2">{result.expected}</td>
                  <td className="border p-2">{result.variance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PERTCalculator;