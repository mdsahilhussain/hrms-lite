const Pagination = () => {
  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => setPage((p) => p - 1)}
        disabled={!pagination?.previous}
      >
        Prev
      </button>

      <span>Page {pagination?.current_page}</span>

      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={!pagination?.next}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
