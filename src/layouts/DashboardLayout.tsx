// src/layouts/DashboardLayout.tsx

import { useState, type ReactNode } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { getSidebarByRole } from "../config/sidebarConfig";
import { mapRoleToSidebar } from "../config/roleMapper";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../api/authStore";

type Props = {
  children: ReactNode;
  title: string;
};

export default function DashboardLayout({ children, title }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const sidebarRole = mapRoleToSidebar(user.role);
  const sidebarItems = getSidebarByRole(sidebarRole);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div
        className={`${
          collapsed ? "w-20" : "w-60"
        } bg-slate-900 text-white flex flex-col transition-all duration-300`}
      >

        {/* TOP */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
          {!collapsed && <h1 className="font-semibold text-sm">SVES</h1>}
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <Menu size={18} /> : <X size={18} />}
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 flex flex-col gap-1 px-2 py-3">
          {sidebarItems.map((item, i) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
                  ${isActive ? "bg-slate-700" : "hover:bg-slate-700"}`
                }
              >
                <Icon size={16} />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* USER SECTION */}
        <div className="px-3 py-3 border-t border-slate-700">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold">
                {user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              {!collapsed && (
                <div className="leading-tight">
                  <p className="text-sm font-medium truncate max-w-[120px]">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user.role}
                  </p>
                </div>
              )}
            </div>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="p-1.5 hover:bg-slate-700 rounded-md"
            >
              <LogOut size={16} />
            </button>

          </div>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="h-14 bg-white shadow flex items-center justify-between px-6">
          <h2 className="font-medium text-sm">{title}</h2>

          <input
            placeholder="Search..."
            className="border px-3 py-1 text-sm rounded-md"
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

      </div>

    </div>
  );
}