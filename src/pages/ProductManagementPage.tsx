import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DashboardModuleContainer from '@/components/DashboardModuleContainer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Badge } from '@/components/ui/badge';
import { Search, PlusCircle, ShoppingBag, Package, BarChart3, Settings, Home } from 'lucide-react';

const sampleProducts = [
  { id: 'PROD001', name: 'Laptop Pro 15"', sku: 'LP15-001', price: '$1200.00', stock: 50, category: 'Electronics' },
  { id: 'PROD002', name: 'Wireless Mouse', sku: 'WM-002', price: '$25.00', stock: 150, category: 'Accessories' },
  { id: 'PROD003', name: 'Mechanical Keyboard', sku: 'MK-003', price: '$75.00', stock: 5, category: 'Accessories' },
  { id: 'PROD004', name: '4K Monitor 27"', sku: 'MON27-004', price: '$300.00', stock: 25, category: 'Monitors' },
  { id: 'PROD005', name: 'USB-C Hub', sku: 'HUB-005', price: '$40.00', stock: 0, category: 'Accessories' },
];

const dashboardNavItems = [
  { href: "/dashboard", label: "Overview", icon: <Home className="h-5 w-5" /> },
  { href: "/dashboard/orders", label: "Orders", icon: <ShoppingBag className="h-5 w-5" /> },
  { href: "/dashboard/products", label: "Products", icon: <Package className="h-5 w-5" /> },
  { href: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 className="h-5 w-5" /> },
  { href: "/dashboard/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];

const ProductManagementPage = () => {
  console.log('ProductManagementPage loaded');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockBadgeVariant = (stock: number) => {
    if (stock === 0) return 'destructive';
    if (stock < 10) return 'secondary'; // Using secondary for 'warning' as per shadcn badge variants
    return 'default';
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
            title="Product Management"
            description="Manage your product inventory and details."
            action={
              <Button size="sm" className="ml-auto gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                Add Product (Not Implemented)
              </Button>
            }
          >
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products by name or SKU..."
                  className="pl-8 w-full sm:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <Badge variant={getStockBadgeVariant(product.stock) as any}>
                        {product.stock > 0 ? `${product.stock} units` : 'Out of Stock'}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </DashboardModuleContainer>
        </main>
      </div>
    </div>
  );
};

export default ProductManagementPage;