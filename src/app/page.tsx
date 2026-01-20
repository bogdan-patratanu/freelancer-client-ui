import { Briefcase, Users, FileText, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Freelancer Client UI
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Manage your freelance projects, clients, and workflow efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            icon={<Briefcase className="w-8 h-8" />}
            title="Projects"
            description="Track and manage all your freelance projects in one place"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Clients"
            description="Keep detailed records of your client relationships"
          />
          <FeatureCard
            icon={<FileText className="w-8 h-8" />}
            title="Invoices"
            description="Create and send professional invoices with ease"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Analytics"
            description="Monitor your business performance and growth"
          />
        </div>

        <div className="text-center">
          <button className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="text-slate-900 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
