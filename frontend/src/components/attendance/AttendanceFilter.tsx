import Input from "../ui/Input";

type Props = {
  date: string;
  onDataChange: (value: string) => void;
};

export default function AttendanceFilter({ date, onDataChange }: Props) {
  return (
    <div className="flex items-end gap-4">
      <Input
        label="Filter by date"
        type="date"
        value={date}
        onChange={(e) => onDataChange(e.target.value)}
      />
    </div>
  );
}
