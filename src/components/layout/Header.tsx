import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For mobile menu
import { Menu, Bell, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  userName?: string;
  userEmail?: string;
  userAvatarUrl?: string;
  onLogout?: () => void;
  sidebarNavItems?: { href: string; label: string; icon?: React.ReactNode }[]; // For mobile menu
}

const Header: React.FC<HeaderProps> = ({ userName = "User", userEmail, userAvatarUrl, onLogout, sidebarNavItems }) => {
  console.log("Rendering Header component");

  const userInitials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {/* Mobile Menu - using Sheet for sidebar content */}
      {sidebarNavItems && sidebarNavItems.length > 0 && (
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="/dashboard"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                {/* Placeholder for Logo Icon */}
                <span className="h-5 w-5 transition-all group-hover:scale-110">DA</span>
                <span className="sr-only">Dashboard</span>
              </Link>
              {sidebarNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      )}

      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Search Input - Placeholder, can be implemented if needed */}
        {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        /> */}
      </div>

      {/* Notifications - Placeholder */}
      <Button variant="ghost" size="icon" className="rounded-full" aria-label="Notifications">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <Avatar>
              <AvatarImage src={userAvatarUrl} alt={userName} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{userName}</DropdownMenuLabel>
          {userEmail && <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">{userEmail}</DropdownMenuLabel>}
          <DropdownMenuSeparator />
          <Link to="/dashboard/settings"> {/* Example link */}
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          {onLogout ? (
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          ) : (
             <Link to="/login"> {/* Fallback if no onLogout */}
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Login
                </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
export default Header;