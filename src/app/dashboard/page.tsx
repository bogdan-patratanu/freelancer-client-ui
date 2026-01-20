import { Briefcase, Users, FileText, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome back!
        </h2>
        <p className="text-slate-600">
          Here's what's happening with your freelance business today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Projects"
          value="12"
          icon={<Briefcase className="w-6 h-6" />}
          trend="+2 this week"
          trendUp={true}
        />
        <StatCard
          title="Total Clients"
          value="28"
          icon={<Users className="w-6 h-6" />}
          trend="+5 this month"
          trendUp={true}
        />
        <StatCard
          title="Pending Invoices"
          value="8"
          icon={<FileText className="w-6 h-6" />}
          trend="3 overdue"
          trendUp={false}
        />
        <StatCard
          title="Revenue"
          value="$24,500"
          icon={<TrendingUp className="w-6 h-6" />}
          trend="+12% from last month"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Recent Projects
          </h3>
          <div className="space-y-3">
            <ProjectItem
              name="Website Redesign"
              client="Acme Corp"
              status="In Progress"
              progress={65}
            />
            <ProjectItem
              name="Mobile App Development"
              client="Tech Startup"
              status="In Progress"
              progress={40}
            />
            <ProjectItem
              name="Brand Identity"
              client="Fashion Brand"
              status="Review"
              progress={90}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <ActivityItem
              action="Invoice sent"
              target="Acme Corp - $5,000"
              time="2 hours ago"
            />
            <ActivityItem
              action="Project completed"
              target="Logo Design for StartupXYZ"
              time="5 hours ago"
            />
            <ActivityItem
              action="New client added"
              target="Fashion Brand Inc."
              time="1 day ago"
            />
            <ActivityItem
              action="Payment received"
              target="Tech Startup - $3,500"
              time="2 days ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend,
  trendUp,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-600">{icon}</div>
      </div>
      <div className="mb-2">
        <div className="text-3xl font-bold text-slate-900">{value}</div>
        <div className="text-sm text-slate-600 mt-1">{title}</div>
      </div>
      <div
        className={`text-sm font-medium ${
          trendUp ? "text-green-600" : "text-orange-600"
        }`}
      >
        {trend}
      </div>
    </div>
  );
}

function ProjectItem({
  name,
  client,
  status,
  progress,
}: {
  name: string;
  client: string;
  status: string;
  progress: number;
}) {
  return (
    <div className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-medium text-slate-900">{name}</p>
          <p className="text-sm text-slate-500">{client}</p>
        </div>
        <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded">
          {status}
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function ActivityItem({
  action,
  target,
  time,
}: {
  action: string;
  target: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
      <div className="flex-1">
        <p className="text-sm text-slate-900">
          <span className="font-medium">{action}</span> - {target}
        </p>
        <p className="text-xs text-slate-500 mt-1">{time}</p>
      </div>
    </div>
  );
}
