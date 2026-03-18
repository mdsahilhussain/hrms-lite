import type { ComponentType } from "react";
import Card from "../ui/Card";
import { cn } from "../../lib/utils";

interface IconProps {
  className?: string;
}

type StatCardProps = {
  title: string;
  value: number | string;
  Icon: ComponentType<IconProps>;
  className?: string;
};

export default function StatCard({ title, value, Icon, className }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-0.5">
      <Icon className="text-gray-400 size-6 mb-2"/>
      <h3 className={cn("text-2xl font-semibold text-gray-800", className)}>{value}</h3>
      <p className="text-sm text-gray-500">{title}</p>
    </Card>
  );
}
