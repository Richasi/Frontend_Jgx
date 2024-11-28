import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

interface Order {
  id: string;
  customerName: string;
  orderAmount: string;
  status: string;
  createdAt: string;
}

interface PageData {
  data: Order[];
  nextCursor: number | null;
}

export const useOrders = (sort: string, sortDirection: string, limit = 50) => {
  return useInfiniteQuery<PageData, Error>(
    ['orders', sort, sortDirection],
    async ({ pageParam = 1 }) => {
      const { data, headers } = await axios.get<Order[]>('/orders', {
        params: {
          _page: pageParam,
          _limit: limit,
          _sort: sort,
          _order: sortDirection,
        },
      });

      return {
        data,
        nextCursor: pageParam < parseInt(headers['x-total-count'] || '0') / limit ? pageParam + 1 : null,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
};
