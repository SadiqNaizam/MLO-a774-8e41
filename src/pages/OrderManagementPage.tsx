import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DashboardModuleContainer from '@/components/DashboardModuleContainer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Search, PlusCircle, ShoppingBag, Package, BarChart3, Settings, Home, Eye } from 'lucide-react';

const sampleOrders = [
  { id: 'ORD001', customer: 'John Doe', date: '2024-07-20', status: 'Shipped', total: '$150.00', items: [{name: 'Product A', qty: 2}, {name: 'Product B', qty: 1}] },
  { id: 'ORD002', customer: 'Jane Smith', date: '2024-07-19', status: 'Processing', total: '$75.50', items: [{name: 'Product C', qty: 1}] },
  { id: 'ORD003', customer: 'Alice Brown', date: '2024-07-19', status: 'Delivered', total: '$220.00', items: [{name: 'Product A', qty: 1}, {name: 'Product D', qty: 3}] },
  { id: 'ORD004', customer: 'Bob Green', date: '2024-07-18', status: 'Pending', total: '$99.99', items: [{name: 'Product B', qty: 2}] },
  { id: 'ORD005', customer: 'Charlie Black', date: '2024-07-18', status: 'Cancelled', total: '$50.25', items: [{name: 'Product E', qty: 1}] },
];

const dashboardNavItems = [
  { href: "/dashboard", label: "Overview", icon: <Home className="h-5 w-5" /> },
  { href: "/dashboard/orders", label: "Orders", icon: <ShoppingBag className="h-5 w-5" /> },
  { href: "/dashboard/products", label: "Products", icon: <Package className="h-5 w-5" /> },
  { href: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 className="h-5 w-5" /> },
  { href: "/dashboard/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];

type Order = typeof sampleOrders[0];

const OrderManagementPage = () => {
  console.log('OrderManagementPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = sampleOrders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Shipped':
      case 'Delivered':
        return 'default'; // Greenish in default shadcn `default` variant
      case 'Processing':
        return 'secondary'; // Bluish/grayish
      case 'Pending':
        return 'outline'; // Yellowish (using outline for differentiation)
      case 'Cancelled':
        return 'destructive'; // Reddish
      default:
        return 'default';
    }
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
        <main className="flex-1 grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <DashboardModuleContainer
            title="Order Management"
            description="View, search, and manage customer orders."
            action={
              <Button size="sm" className="ml-auto gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                Add Order (Not Implemented)
              </Button>
            }
          >
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders by ID or customer..."
                  className="pl-8 w-full sm:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </DialogTrigger>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </DashboardModuleContainer>
        </main>
        {selectedOrder && (
          <Dialog open={!!selectedOrder} onOpenChange={(isOpen) => !isOpen && setSelectedOrder(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
                <DialogDescription>Customer: {selectedOrder.customer} - Total: {selectedOrder.total}</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p><strong>Status:</strong> <Badge variant={getStatusVariant(selectedOrder.status) as any}>{selectedOrder.status}</Badge></p>
                <p><strong>Date:</strong> {selectedOrder.date}</p>
                <h4 className="font-semibold mt-2">Items:</h4>
                <ul>
                  {selectedOrder.items.map(item => (
                    <li key={item.name}>{item.name} (Qty: {item.qty})</li>
                  ))}
                </ul>
              </div>
              <DialogFooter>
                <Button onClick={() => setSelectedOrder(null)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default OrderManagementPage;