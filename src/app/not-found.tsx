import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-6xl font-bold text-slate-900 mb-4">404</h2>
        <p className="text-xl text-slate-600 mb-6">Page not found</p>
        <Link
          href="/"
          className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
