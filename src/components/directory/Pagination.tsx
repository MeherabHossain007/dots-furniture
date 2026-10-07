import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number | 'all';
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number | 'all') => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) => {
  const currentCount = pageSize === 'all' 
    ? totalItems 
    : Math.min(currentPage * pageSize, totalItems);
  const startCount = pageSize === 'all'
    ? 1
    : Math.min((currentPage - 1) * pageSize + 1, totalItems);

  // Generate page buttons with limit
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white dark:bg-[#151D2A] border-t border-slate-200 dark:border-slate-800 text-[12px] text-slate-700 dark:text-slate-300">
      {/* Showing count */}
      <div>
        Showing <strong className="text-slate-900 dark:text-slate-100 font-bold">{totalItems === 0 ? 0 : `${startCount}–${currentCount}`}</strong> of{' '}
        <strong className="text-slate-900 dark:text-slate-100 font-bold">{totalItems}</strong> employees
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Page Size */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-600 dark:text-slate-400 font-semibold text-[11px]">Rows:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              const val = e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10);
              onPageSizeChange(val);
            }}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-[12px] font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-600 cursor-pointer"
          >
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="all">All</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1 || pageSize === 'all'}
            className="p-1.5 rounded bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed border border-slate-300 dark:border-slate-700 transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {pageSize !== 'all' && pageNumbers.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`min-w-7 h-7 px-2 rounded text-[12px] border transition-colors ${
                p === currentPage
                  ? 'bg-emerald-700 border-emerald-700 text-white font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-950 dark:hover:text-white font-semibold'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || pageSize === 'all'}
            className="p-1.5 rounded bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed border border-slate-300 dark:border-slate-700 transition-colors"
            title="Next Page"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
