import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

interface RecentActivityFeedItemProps {
  id: string | number;
  actorName?: string; // e.g., "John Doe" or "System"
  actorAvatarUrl?: string;
  actionText: string; // e.g., "updated order #1234" or "flagged product X"
  timestamp: string; // e.g., "5 minutes ago" or "2023-10-26 10:30 AM"
  type?: 'info' | 'warning' | 'success' | 'error'; // To determine icon and style
  link?: string; // Optional link for the item
  onClick?: (id: string | number) => void;
}

const RecentActivityFeedItem: React.FC<RecentActivityFeedItemProps> = ({
  id,
  actorName,
  actorAvatarUrl,
  actionText,
  timestamp,
  type = 'info',
  link,
  onClick,
}) => {
  console.log("Rendering RecentActivityFeedItem:", id, actionText);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'info':
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const actorInitials = actorName
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'S'; // Default to 'S' for System or if no name

  const content = (
    <div className={cn(
        "flex items-start space-x-3 py-3 px-2 hover:bg-muted/50 rounded-md",
        onClick || link ? "cursor-pointer" : ""
      )}
      onClick={() => onClick?.(id)}
    >
      {actorName && (
        <Avatar className="h-8 w-8">
            <AvatarImage src={actorAvatarUrl} alt={actorName} />
            <AvatarFallback>{actorInitials}</AvatarFallback>
        </Avatar>
      )}
      {!actorName && getIcon() && <div className="flex-shrink-0 pt-1">{getIcon()}</div>}

      <div className="flex-1">
        <p className="text-sm">
          {actorName && <span className="font-semibold">{actorName}</span>}{' '}
          {actionText}
        </p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block text-current no-underline">
        {content}
      </a>
    );
  }

  return content;
}
export default RecentActivityFeedItem;