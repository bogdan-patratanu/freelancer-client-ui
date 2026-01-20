import Link from "next/link";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-slate-900">
            Freelancer UI
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/projects"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/clients"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Clients
            </Link>
            <Link
              href="/invoices"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Invoices
            </Link>
          </nav>

          <button className="md:hidden p-2 text-slate-600 hover:text-slate-900">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
