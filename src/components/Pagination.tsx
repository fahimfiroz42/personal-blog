'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  baseUrl: string;
}

export default function Pagination({ totalPages, currentPage, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    return `${baseUrl}?page=${pageNumber}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logic for ellipsis [...] for many pages
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 'ellipsis', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === 'ellipsis') {
        return (
          <div key={`ellipsis-${index}`} className="flex h-10 w-10 items-center justify-center text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </div>
        );
      }

      const isCurrent = page === currentPage;
      return (
        <Link
          key={page}
          href={createPageUrl(page as number)}
          className={cn(
            buttonVariants({ variant: isCurrent ? "default" : "ghost", size: "icon" }),
            "h-10 w-10 rounded-xl font-bold transition-all",
            isCurrent ? "shadow-lg scale-110 pointer-events-none" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {page}
        </Link>
      );
    });
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-xl h-10 w-10")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <div className="h-10 w-10 opacity-20 pointer-events-none flex items-center justify-center">
           <ChevronLeft className="h-4 w-4" />
        </div>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {renderPageNumbers()}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-xl h-10 w-10")}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <div className="h-10 w-10 opacity-20 pointer-events-none flex items-center justify-center">
           <ChevronRight className="h-4 w-4" />
        </div>
      )}
    </nav>
  );
}
