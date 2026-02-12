import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { getJournals, createJournal, createJournalEvent, updateJournal, deleteJournal, getJournalDetail } from './api'
import type {
  CreateJournalRequest,
  CreateJournalEventRequest,
  JournalEventResponse,
  UpdateJournalRequest,
  Journal,
  Pagination,
  ApiResponse,
} from '@/types'
import { JournalDetailResponse } from '@/types/journals'

/**
 * 일지 목록 조회 훅
 */
export function useJournals(
  page = 1,
  limit = 10
): UseQueryResult<ApiResponse<Pagination<Journal>>, Error> {
  return useQuery({
    queryKey: ['journals', page, limit],
    queryFn: () => getJournals(page, limit),
  })
}

/**
 * 일지 생성 훅
 */
export function useCreateJournal(): UseMutationResult<
  ApiResponse<Journal>,
  Error,
  CreateJournalRequest,
  unknown
> {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateJournalRequest) => createJournal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      router.push('/journal/list')
    },
  })
}

/**
 * 일지 수정 훅
 */
export function useUpdateJournal(): UseMutationResult<
  ApiResponse<Journal | null>,
  Error,
  { id: number; data: UpdateJournalRequest },
  unknown
> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateJournalRequest }) =>
      updateJournal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

/**
 * 일지 삭제 훅
 */
export function useDeleteJournal(): UseMutationResult<
  ApiResponse<boolean>,
  Error,
  number,
  unknown
> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteJournal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['report', 'emotion-performance'] })
    },
  })
}

/**
 * 일지 상세 조회 훅
 */
export function useGetJournalDetail(
  id: number,
  options?: {
    enabled?: boolean
  }
): UseQueryResult<ApiResponse<JournalDetailResponse>, Error> {
  return useQuery({
    queryKey: ['journalDetail', id],
    queryFn: () => getJournalDetail(id),
    enabled: options?.enabled ?? true,
  })
}

/**
 * 감정 이벤트 생성 훅
 */
export function useCreateJournalEvent(): UseMutationResult<
  ApiResponse<JournalEventResponse>,
  Error,
  { journalId: number; data: CreateJournalEventRequest },
  unknown
> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ journalId, data }: { journalId: number; data: CreateJournalEventRequest }) =>
      createJournalEvent(journalId, data),
    onSuccess: (response, { journalId }) => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['journalDetail', journalId] })
      queryClient.invalidateQueries({ queryKey: ['journals'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['report', 'emotion-performance'] })
    },
  })
}
