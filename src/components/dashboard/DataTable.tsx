import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ColumnType = "text" | "currency" | "status" | "date" | "actions";

interface Column {
  key: string;
  label: string;
  type?: ColumnType;
}

interface DataTableProps {
  title: string;
  description?: string;
  columns: Column[];
  data: Record<string, any>[];
  actions?: boolean;
}

export function DataTable({
  title,
  description,
  columns,
  data,
  actions = true,
}: DataTableProps) {
  const formatCellValue = (value: any, type: ColumnType = "text") => {
    switch (type) {
      case "currency":
        return `$${Number(value).toLocaleString()}`;
      case "status":
        const statusColors = {
          active: "bg-success/10 text-success border-success/20",
          pending: "bg-warning/10 text-warning border-warning/20",
          inactive: "bg-muted text-muted-foreground",
          overdue: "bg-destructive/10 text-destructive border-destructive/20",
        };
        return (
          <Badge
            variant="outline"
            className={statusColors[value?.toLowerCase() as keyof typeof statusColors] || statusColors.inactive}
          >
            {value}
          </Badge>
        );
      case "date":
        return new Date(value).toLocaleDateString();
      default:
        return value;
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {columns.map((column) => (
                  <TableHead key={column.key} className="font-semibold text-foreground">
                    {column.label}
                  </TableHead>
                ))}
                {actions && (
                  <TableHead className="w-12">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-muted/50 transition-colors"
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} className="py-3">
                      {formatCellValue(row[column.key], column.type)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-muted"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}