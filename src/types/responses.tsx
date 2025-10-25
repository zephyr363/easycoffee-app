export interface PaginationResponseI<T> {
    results: T[];
    next: string | null;
    previous: string | null;
    count: number;
}