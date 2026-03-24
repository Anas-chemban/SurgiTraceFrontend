// src/layouts/DashboardLayout.tsx

import { useState, type ReactNode } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { roleSidebar } from "../config/sidebarConfig";
import { mapRoleToSidebar } from "../config/roleMapper";
import { useAuthStore } from "../app/store";

type Props = {
  children: ReactNode;
  title: string;
};

export default function DashboardLayout({ children, title }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuthStore();

  // 🔥 map backend role → sidebar role
  const sidebarRole = user ? mapRoleToSidebar(user.role) : "doctor";
  const sidebarItems = roleSidebar[sidebarRole];
  
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-slate-900 text-white flex flex-col transition-all duration-300`}
      >
        {/* Top */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          {!collapsed && <h1 className="font-bold">SVES</h1>}
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {sidebarItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer"
              >
                <Icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </div>
            );
          })}
        </div>

        {/* 🔥 USER SECTION (THIS IS WHAT YOU WANTED) */}
        <div className="p-4 border-t border-slate-700">
          {user && (
            <div className="flex items-center justify-between">
              
              {/* LEFT */}
              <div className="flex items-center gap-3">
                
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold">
                  {user.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                {/* Name + Role */}
                {!collapsed && (
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-400">
                      {user.role}
                    </p>
                  </div>
                )}
              </div>

              {/* RIGHT → Logout */}
              <button
                onClick={logout}
                className="p-2 hover:bg-slate-700 rounded-lg"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h2 className="font-semibold">{title}</h2>
          <input
            placeholder="Search..."
            className="border px-3 py-1 rounded-md"
          />
        </div>

        {/* Scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}