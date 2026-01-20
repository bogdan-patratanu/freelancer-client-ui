export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Freelancer UI</h3>
            <p className="text-slate-400">
              Manage your freelance business efficiently
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="/projects" className="hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="/clients" className="hover:text-white transition-colors">
                  Clients
                </a>
              </li>
              <li>
                <a href="/invoices" className="hover:text-white transition-colors">
                  Invoices
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-slate-400">
              Need help? Get in touch with our support team.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Freelancer UI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
