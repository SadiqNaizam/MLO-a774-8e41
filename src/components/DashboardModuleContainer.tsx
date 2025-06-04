import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface DashboardModuleContainerProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  action?: React.ReactNode; // Optional action button or element for the header
}

const DashboardModuleContainer: React.FC<DashboardModuleContainerProps> = ({
  title,
  description,
  children,
  className,
  contentClassName,
  action
}) => {
  console.log("Rendering DashboardModuleContainer with title:", title);
  return (
    <Card className={cn("w-full", className)}>
      {(title || description || action) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {action && <div className="ml-auto">{action}</div>}
        </CardHeader>
      )}
      <CardContent className={contentClassName}>
        {children}
      </CardContent>
    </Card>
  );
}
export default DashboardModuleContainer;