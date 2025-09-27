"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  MessageSquare,
  FileText,
  Settings,
  Heart,
  Brain,
  TrendingUp,
  User,
  LogOut,
  Menu,
  X,
  Shield,
  HelpCircle,
} from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";

interface SidebarItem {
  name: string;
  href: string;
  icon: any;
  count?: number;
}

const sidebarSections = [
  {
    title: "Workspace",
    items: [
      { name: "Dashboard", href: "/quiz/dashboard", icon: LayoutDashboard },
      { name: "Users", href: "/quiz/users", icon: Users },
      { name: "Analytics", href: "/quiz/analytics", icon: TrendingUp },
    ] as SidebarItem[],
  },
];

interface DashboardSidebarProps {
  userEmail?: string;
}

export function DashboardSidebar({ userEmail }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transform transition-all duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-20" : "w-72"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">MindZen</h1>
                  <p className="text-xs text-gray-500">Mental Health Platform</p>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isCollapsed ? (
                <Menu className="w-5 h-5 text-gray-600" />
              ) : (
                <X className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* User Profile moved to footer per request */}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
            {sidebarSections.map((section) => (
              <div key={section.title}>
                {!isCollapsed && (
                  <h3 className="px-2 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {section.title}
                  </h3>
                )}
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <item.icon
                            className={`flex-shrink-0 w-5 h-5 ${
                              isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
                            }`}
                          />
                          {!isCollapsed && (
                            <>
                              <span className="ml-3 truncate">{item.name}</span>
                              {item.count && (
                                <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-blue-600 bg-blue-100 rounded-full">
                                  {item.count}
                                </span>
                              )}
                            </>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>


          {/* Footer with user info & logout; hidden when collapsed */}
          {!isCollapsed && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-800 truncate">{userEmail || "User"}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <LogoutButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
