export interface IPagingSupport<T> {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    content: T[];
}

export interface IBasicError {
    response: {
        data: {
            message?: string;
        };
    };
}
