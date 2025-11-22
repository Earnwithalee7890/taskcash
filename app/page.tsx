import HubDashboard from "@/components/hub-dashboard";
import UserProfile from "@/components/user-profile";
import TaskList from "@/components/task-list";

export default function Home() {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* User Profile Header */}
            <UserProfile />

            {/* Hub Dashboard */}
            <HubDashboard />

            {/* Available Tasks */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">Available Tasks</h2>
                <TaskList />
            </div>
        </div>
    );
}
