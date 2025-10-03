import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  DollarSign,
  PiggyBank,
  Users,
  FileText,
  Settings,
  CreditCard,
  TrendingUp,
  Building2,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: BarChart3, roles: [] },
  { title: "Loans", url: "/loans", icon: DollarSign, roles: [] },
  { title: "Savings", url: "/savings", icon: PiggyBank, roles: [] },
  { title: "Members", url: "/members", icon: Users, roles: ['staff', 'admin'] },
  { title: "Contributors", url: "/contributors", icon: CreditCard, roles: [] },
  { title: "Analytics", url: "/analytics", icon: TrendingUp, roles: ['staff', 'admin'] },
];

const managementItems = [
  { title: "Reports", url: "/reports", icon: FileText, roles: ['staff', 'admin'] },
  { title: "Admin", url: "/admin", icon: Settings, roles: ['admin'] },
  { title: "Settings", url: "/settings", icon: Settings, roles: ['admin'] },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, logout, roles, isAdmin, isStaff } = useAuth();

  const hasRequiredRole = (requiredRoles: string[]) => {
    if (requiredRoles.length === 0) return true;
    return requiredRoles.some(role => 
      role === 'admin' ? isAdmin : 
      role === 'staff' ? isStaff : 
      roles.includes(role as any)
    );
  };

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary"
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  const filteredMainNav = mainNavItems.filter(item => hasRequiredRole(item.roles));
  const filteredManagementNav = managementItems.filter(item => hasRequiredRole(item.roles));

  return (
    <Sidebar className={`border-r border-border ${collapsed ? "w-16" : "w-64"}`}>
      <SidebarContent className="bg-card">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-lg text-foreground">SACCOVision</h1>
                <p className="text-xs text-muted-foreground">Financial Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-6 py-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-4">
              {filteredMainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${getNavCls({ isActive })}`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        {filteredManagementNav.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-6 py-2">
              Management
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-4">
                {filteredManagementNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={({ isActive }) => 
                          `flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${getNavCls({ isActive })}`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      
      {/* Footer with User Info and Logout */}
      <SidebarFooter className="border-t border-border p-4">
        <div className="flex flex-col gap-2">
          {!collapsed && user && (
            <div className="px-3 py-2 text-sm">
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground truncate">{user.email}</span>
              </div>
              {roles.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  Role: {roles.join(', ')}
                </div>
              )}
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}