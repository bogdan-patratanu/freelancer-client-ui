"use client";

import { Outfit } from 'next/font/google';
import './globals.css';
import 'flatpickr/dist/flatpickr.css';
import { SidebarProvider, useSidebar } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import AppSidebar from '@/layout/AppSidebar';
import Backdrop from '@/layout/Backdrop';
import AppHeader from '@/layout/AppHeader';

const outfit = Outfit({
  subsets: ['latin']
});

function AppLayout({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>
            <AppLayout>{children}</AppLayout>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
