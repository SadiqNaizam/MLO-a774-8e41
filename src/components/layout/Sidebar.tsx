import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package2, Home, ShoppingCart, Package, BarChart3, Users, Settings } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils'; // For conditional classes

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

interface SidebarProps {
  navItems?: NavItem[]; // Allow custom nav items
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: <Home className="h-5 w-5" /> },
  { href: "/dashboard/orders", label: "Orders", icon: <ShoppingCart className="h-5 w-5" /> },
  { href: "/dashboard/products", label: "Products", icon: <Package className="h-5 w-5" /> },
  { href: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 className="h-5 w-5" /> },
  { href: "/dashboard/customers", label: "Customers", icon: <Users className="h-5 w-5" />, disabled: true }, // Example disabled
];

const Sidebar: React.FC<SidebarProps> = ({ navItems = defaultNavItems, className }) => {
  const location = useLocation();
  console.log("Rendering Sidebar, current location:", location.pathname);

  return (
    <aside className={cn("fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex", className)}>
      <nav className="flex flex-col items-start gap-2 px-2 sm:py-5">
        <Link
          to="/dashboard"
          className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 self-center rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base mb-4"
        >
          <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">Dashboard App</span>
        </Link>

        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              location.pathname === item.href && "bg-muted text-primary",
              item.disabled && "pointer-events-none opacity-50"
            )}
            aria-disabled={item.disabled}
            tabIndex={item.disabled ? -1 : undefined}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-start gap-2 px-2 sm:py-5">
         <Link
          to="/dashboard/settings"
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            location.pathname === "/dashboard/settings" && "bg-muted text-primary"
          )}
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </nav>
    </aside>
  );
}
export default Sidebar;