import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DashboardModuleContainer from '@/components/DashboardModuleContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { format } from "date-fns";
import { Calendar as CalendarIcon, ShoppingBag, Package, BarChart3, Settings, Home } from 'lucide-react';
import { DateRange } from "react-day-picker";

const salesData = [
  { date: '2024-07-01', sales: 2500, orders: 20 },
  { date: '2024-07-02', sales: 2800, orders: 22 },
  { date: '2024-07-03', sales: 2200, orders: 18 },
  { date: '2024-07-04', sales: 3100, orders: 25 },
  { date: '2024-07-05', sales: 2700, orders: 21 },
];

const trafficData = [
  { source: 'Organic Search', visitors: 1200, conversionRate: '5.5%' },
  { source: 'Direct', visitors: 800, conversionRate: '7.2%' },
  { source: 'Referral', visitors: 500, conversionRate: '4.1%' },
  { source: 'Social Media', visitors: 950, conversionRate: '3.8%' },
];

const chartConfig = {
  sales: { label: "Sales ($)", color: "hsl(var(--chart-1))" },
  orders: { label: "Orders", color: "hsl(var(--chart-2))" },
};

const dashboardNavItems = [
  { href: "/dashboard", label: "Overview", icon: <Home className="h-5 w-5" /> },
  { href: "/dashboard/orders", label: "Orders", icon: <ShoppingBag className="h-5 w-5" /> },
  { href: "/dashboard/products", label: "Products", icon: <Package className="h-5 w-5" /> },
  { href: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 className="h-5 w-5" /> },
  { href: "/dashboard/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];

const AnalyticsReportsPage = () => {
  console.log('AnalyticsReportsPage loaded');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 6, 1),
    to: new Date(2024, 6, 31),
  });

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
          <DashboardModuleContainer
            title="Analytics & Reports"
            description="Dive deeper into your business performance."
          >
            <div className="flex flex-col sm:flex-row gap-2 mb-6 items-center">
              <Select defaultValue="sales_performance">
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales_performance">Sales Performance</SelectItem>
                  <SelectItem value="traffic_analysis">Traffic Analysis</SelectItem>
                  <SelectItem value="customer_behavior">Customer Behavior (NA)</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full sm:w-auto justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Tabs defaultValue="sales_overview">
              <TabsList className="grid w-full grid-cols-2 sm:w-[400px]">
                <TabsTrigger value="sales_overview">Sales Overview</TabsTrigger>
                <TabsTrigger value="traffic_sources">Traffic Sources</TabsTrigger>
              </TabsList>
              <TabsContent value="sales_overview" className="mt-4">
                <DashboardModuleContainer title="Daily Sales & Orders" contentClassName="pl-2">
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "MMM d")} tickLine={false} axisLine={false} tickMargin={8}/>
                            <YAxis yAxisId="left" orientation="left" stroke="var(--color-sales)" tickLine={false} axisLine={false} tickMargin={8}/>
                            <YAxis yAxisId="right" orientation="right" stroke="var(--color-orders)" tickLine={false} axisLine={false} tickMargin={8}/>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" hideLabel />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar yAxisId="left" dataKey="sales" fill="var(--color-sales)" radius={4} />
                            <Bar yAxisId="right" dataKey="orders" fill="var(--color-orders)" radius={4} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                </DashboardModuleContainer>
              </TabsContent>
              <TabsContent value="traffic_sources" className="mt-4">
                <DashboardModuleContainer title="Website Traffic Sources">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Source</TableHead>
                        <TableHead>Visitors</TableHead>
                        <TableHead>Conversion Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trafficData.map((row) => (
                        <TableRow key={row.source}>
                          <TableCell className="font-medium">{row.source}</TableCell>
                          <TableCell>{row.visitors}</TableCell>
                          <TableCell>{row.conversionRate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DashboardModuleContainer>
              </TabsContent>
            </Tabs>
          </DashboardModuleContainer>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsReportsPage;