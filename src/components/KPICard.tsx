import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'; // Example icons for trend
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendText?: string; // e.g., "+5.2% from last month"
  description?: string; // Small text under the value
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon,
  trend,
  trendText,
  description,
  className,
}) => {
  console.log("Rendering KPICard with title:", title, "and value:", value);

  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground';

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
        {trendText && (
          <div className="flex items-center text-xs text-muted-foreground pt-1">
            <TrendIcon className={cn("mr-1 h-3 w-3", trendColor)} />
            <span className={trendColor}>{trendText.split(' ')[0]}</span> {/* Color only the numeric part of trend */}
            <span className="ml-1">{trendText.substring(trendText.indexOf(' ') + 1)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
export default KPICard;