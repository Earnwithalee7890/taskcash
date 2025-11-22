import TaskList from '@/components/task-list';
import { ListTodo } from 'lucide-react';

export default function TasksPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
                    <ListTodo className="w-8 h-8 text-primary-400" />
                    <span>Available Tasks</span>
                </h1>
            </div>

            <TaskList />
        </div>
    );
}
