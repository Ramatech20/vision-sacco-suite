import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
  trend?: ReactNode;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  description,
  trend,
}: MetricCardProps) {
  const changeColor = {
    positive: "bg-success/10 text-success border-success/20",
    negative: "bg-destructive/10 text-destructive border-destructive/20",
    neutral: "bg-muted text-muted-foreground",
  };

  return (
    <Card className="shadow-card hover:shadow-elevated transition-all duration-300 bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mb-2">{description}</p>
        )}
        <div className="flex items-center justify-between">
          {change && (
            <Badge
              variant="outline"
              className={`${changeColor[changeType]} text-xs font-medium`}
            >
              {change}
            </Badge>
          )}
          {trend && <div className="flex-1">{trend}</div>}
        </div>
      </CardContent>
    </Card>
  );
}