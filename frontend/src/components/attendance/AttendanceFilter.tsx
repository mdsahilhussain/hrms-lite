import { RotateCcw } from "lucide-react";
import Input from "../ui/Input";

type Props = {
  date: string;
  onDataChange: (value: string) => void;
};

export default function AttendanceFilter({ date, onDataChange }: Props) {
  return (
    <div className="flex items-end gap-4 relative">
      <RotateCcw
        className="absolute top-0.5 right-0.5 size-4"
        onClick={() => onDataChange("")}
      />
      <Input
        label="Filter by date"
        type="date"
        value={date}
        onChange={(e) => onDataChange(e.target.value)}
      />
    </div>
  );
}
