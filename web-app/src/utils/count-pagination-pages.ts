import { PAGINATION_OFFSET } from '@/constants/pagination';

export function countPaginationPages(count: number, offset: number | undefined) {
    return Math.ceil((count + 1) / (offset || PAGINATION_OFFSET));
}