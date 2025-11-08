export interface ApiResponse<T> {
  success: boolean
  content: T
}

export interface PaginateResponse<T> extends ApiResponse<T> {
  page: number
  totalCount: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface DeleteResponse {
  success: boolean
  message: string
}
