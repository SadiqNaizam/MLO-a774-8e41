import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Basic structure, no RHF logic
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShoppingBag, Package, BarChart3, Settings, Home } from 'lucide-react';
// Note: Full form handling with react-hook-form and zod is not implemented here, only the UI structure.

const dashboardNavItems = [
  { href: "/dashboard", label: "Overview", icon: <Home className="h-5 w-5" /> },
  { href: "/dashboard/orders", label: "Orders", icon: <ShoppingBag className="h-5 w-5" /> },
  { href: "/dashboard/products", label: "Products", icon: <Package className="h-5 w-5" /> },
  { href: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 className="h-5 w-5" /> },
  { href: "/dashboard/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];

const UserProfileSettingsPage = () => {
  console.log('UserProfileSettingsPage loaded');

  // Placeholder submit handler
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted (placeholder)');
    // Add actual form submission logic here
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60 flex-grow">
        <Header
            userName="Store Manager"
            userEmail="manager@example.com"
            sidebarNavItems={dashboardNavItems}
            userAvatarUrl="https://i.pravatar.cc/150?u=manager"
        />
        <main className="flex-1 flex justify-center items-start p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card className="w-full max-w-2xl mt-8">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your account details and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://i.pravatar.cc/150?u=manager" alt="Store Manager" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <Button variant="outline" type="button" onClick={() => console.log('Upload avatar clicked')}>Change Avatar</Button>
                    </Label>
                    <Input id="avatar-upload" type="file" className="hidden" />
                    <p className="text-xs text-muted-foreground mt-1">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                {/* Using simple Label and Input for structure; for full shadcn/Form, use FormField etc. */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Store Manager" placeholder="Your full name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="manager@example.com" placeholder="your@email.com" />
                </div>
                
                <CardTitle className="text-lg pt-4">Change Password</CardTitle>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>
                <CardFooter className="px-0 pt-6">
                  <Button type="submit">Save Changes</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default UserProfileSettingsPage;