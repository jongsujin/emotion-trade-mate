/**
 * 일지 관련 API 호출 함수
 * 백엔드 JournalsController와 1:1 매핑
 */

import { API_ROUTES } from '@/constants'
import { apiClient } from '@/lib/api'
import type {
  Journal,
  Pagination,
  CreateJournalRequest,
  CreateJournalEventRequest,
  JournalEventResponse,
  UpdateJournalRequest
} from '@/types'
import { JournalDetailResponse } from '@/types/journals'

/**
 * 일지 목록 조회 (GET /journals)
 * @param page 페이지 번호 (기본: 1)
 * @param limit 페이지당 항목 수 (기본: 10)
 */
export async function getJournals(page = 1, limit = 10) {
  return apiClient.get<Pagination<Journal>>(API_ROUTES.JOURNAL.LIST, {
    page: page.toString(),
    limit: limit.toString(),
  })
}

/**
 * 일지 생성 (POST /journals)
 * @param data 일지 생성 데이터
 */
export async function createJournal(data: CreateJournalRequest) {
  return apiClient.post<Journal>(API_ROUTES.JOURNAL.CREATE, data)
}

/**
 * 일지 수정 (PUT /journals/:id)
 * @param id 일지 ID
 * @param data 수정할 데이터
 */
export async function updateJournal(id: number, data: UpdateJournalRequest) {
  return apiClient.put<Journal | null>(API_ROUTES.JOURNAL.UPDATE(id.toString()), data)
}

/**
 * 일지 삭제 (DELETE /journals/:id)
 * @param id 일지 ID
 */
export async function deleteJournal(id: number) {
  return apiClient.delete<boolean>(API_ROUTES.JOURNAL.DELETE(id.toString()))
}

/**
 * 일지 상세 조회 (GET /journals/:id/detail)
 * @param id 일지 ID
 */
export async function getJournalDetail(id: number) {
  return apiClient.get<JournalDetailResponse>(API_ROUTES.JOURNAL.DETAIL(id.toString()))
}

/**
 * 감정 이벤트 생성 (POST /journals/:id/events)
 * @param journalId 일지 ID
 * @param data 이벤트 데이터
 */
export async function createJournalEvent(journalId: number, data: CreateJournalEventRequest) {
  return apiClient.post<JournalEventResponse>(
    API_ROUTES.JOURNAL.CREATE_EVENT(journalId.toString()),
    data
  )
}
