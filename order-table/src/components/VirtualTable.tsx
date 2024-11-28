import React, { useState, useRef, useCallback } from 'react';
import { useOrders } from '../hooks/useOrders';

const ROW_HEIGHT = 50;
const TABLE_HEIGHT = 500;

const VirtualTable = () => {
  const [sort, setSort] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error } = useOrders(sort, sortDirection);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || !hasNextPage || isFetchingNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleSort = (field: string) => {
    if (sort === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSort(field);
      setSortDirection('asc');
    }
  };

  const rows = data?.pages.flatMap((page: { data: any }) => page.data) || [];

  return (
    <div className="table-container">
      <div className="header">
        <div onClick={() => handleSort('customerName')}>Customer Name</div>
        <div onClick={() => handleSort('orderAmount')}>Order Amount</div>
        <div onClick={() => handleSort('status')}>Status</div>
        <div onClick={() => handleSort('createdAt')}>Created At</div>
      </div>
      <div
        className="table-body"
        ref={containerRef}
        style={{ height: TABLE_HEIGHT, overflow: 'auto' }}
        onScroll={handleScroll}
      >
        <div style={{ height: rows.length * ROW_HEIGHT, position: 'relative' }}>
          {rows.map((row: any, index: number) => (
            <div
              key={row.id}
              className="row"
              style={{
                position: 'absolute',
                top: index * ROW_HEIGHT,
                height: ROW_HEIGHT,
              }}
            >
              <div>{row.customerName}</div>
              <div>${row.orderAmount}</div>
              <div>{row.status}</div>
              <div>{new Date(row.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
      {isFetchingNextPage && <div className="loading">Loading more...</div>}
      {isError && <div className="error">{error.message}</div>}
    </div>
  );
};

export default VirtualTable;
