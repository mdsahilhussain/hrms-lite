import Pagination from "./Pagination";

interface PaginationData {
  current_page: number;
  total_pages: number;
  next?: string | null;
  previous?: string | null;
}
type TableProps = {
  headers: string[];
  children: React.ReactNode;
  pagination?: PaginationData;
  setPage: (page: number) => void;
};

export default function Table({
  headers,
  children,
  pagination,
  setPage,
}: TableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-200">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="py-3 text-sm font-semibold text-gray-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{children}</tbody>
        </table>
      </div>
      <Pagination
        currentPage={pagination?.current_page || 1}
        totalPages={pagination?.total_pages || 1}
        hasNext={!!pagination?.next}
        hasPrev={!!pagination?.previous}
        onPageChange={setPage}
      />
    </>
  );
}
