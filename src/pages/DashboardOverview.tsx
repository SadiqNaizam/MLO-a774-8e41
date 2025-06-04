import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DashboardModuleContainer from '@/components/DashboardModuleContainer';
import KPICard from '@/components/KPICard';
import RecentActivityFeedItem from '@/components/RecentActivityFeedItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingBag, Users, Activity, Home, Package, BarChart3, Settings } from 'lucide-react';

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
  mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
};

const recentActivities = [
  { id: '1', actorName: 'Alice Johnson', actionText: 'placed Order #7890', timestamp: '5m ago', type: 'success', actorAvatarUrl: 'https://i.pravatar.cc/150?u=alice' },
  { id: '2', actorName: 'System', actionText: 'Stock for "Wireless Mouse" is low', timestamp: '1h ago', type: 'warning' },
  { id: '3', actorName: 'Bob Williams', actionText: 'updated profile settings', timestamp: '2h ago', type: 'info', actorAvatarUrl: 'https://i.pravatar.cc/150?u=bob' },
  { id: '4', actorName: 'Charlie Brown', actionText: 'cancelled Order #7885', timestamp: '3h ago', type: 'error', actorAvatarUrl: 'https://i.pravatar.cc/150?u=charlie' },
];

const dashboardNavItems = [
  { href: "/dashboard", label: "Overview", icon: <Home className="h-5 w-5" /> },
  { href: "/dashboard/orders", label: "Orders", icon: <ShoppingBag className="h-5 w-5" /> },
  { href: "/dashboard/products", label: "Products", icon: <Package className="h-5 w-5" /> },
  { href: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 className="h-5 w-5" /> },
  { href: "/dashboard/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];

const DashboardOverview = () => {
  console.log('DashboardOverview loaded');
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
        <main className="flex-1 grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPICard
              title="Total Revenue"
              value="$45,231.89"
              icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
              trend="up"
              trendText="+20.1% from last month"
              description="Total earnings this period"
            />
            <KPICard
              title="New Orders"
              value="+1,234"
              icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
              trend="up"
              trendText="+15% from last week"
              description="Newly placed orders"
            />
            <KPICard
              title="Active Users"
              value="573"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
              trend="neutral"
              trendText="+2 since yesterday"
              description="Users active in last 24h"
            />
            <KPICard
              title="Conversion Rate"
              value="12.5%"
              icon={<Activity className="h-4 w-4 text-muted-foreground" />}
              trend="down"
              trendText="-1.2% from last month"
              description="Visitor to customer rate"
            />
          </section>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <DashboardModuleContainer title="Sales Trends" className="lg:col-span-4" contentClassName="pl-2">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} dot={true} />
                    <Line type="monotone" dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} dot={true} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </DashboardModuleContainer>

            <DashboardModuleContainer title="Recent Activity" className="lg:col-span-3">
              <ScrollArea className="h-[350px]">
                <div className="space-y-2 pr-4">
                  {recentActivities.map(activity => (
                    <RecentActivityFeedItem
                      key={activity.id}
                      id={activity.id}
                      actorName={activity.actorName}
                      actionText={activity.actionText}
                      timestamp={activity.timestamp}
                      type={activity.type as 'info' | 'warning' | 'success' | 'error'}
                      actorAvatarUrl={activity.actorAvatarUrl}
                      link={activity.type === 'success' ? '/dashboard/orders' : undefined}
                    />
                  ))}
                </div>
              </ScrollArea>
            </DashboardModuleContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardOverview;