export type Pagination<T> = {
  content: T[];
  hasNext: boolean;
  hasPrevious: boolean;
  totalCount: number;
  totalPages: number;
  page: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};
