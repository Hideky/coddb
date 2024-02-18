import { API_URL } from '../config'
import {
  buildCreateApi,
  coreModule,
  fetchBaseQuery,
  reactHooksModule,
} from '@reduxjs/toolkit/query/react'
import type { RootState } from '../stores/store'
import { Artifact, Guide } from '../interfaces'
import { HYDRATE } from 'next-redux-wrapper'

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
)

export const artifactsApi = createApi({
  reducerPath: 'artifactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    getArtifacts: build.query<[Artifact], void>({
      query: () => 'artifacts/',
    }),
    getArtifact: build.query<Artifact, string>({
      query: (id) => `artifacts/${id}/`,
    }),
  }),
})

export const guidesApi = createApi({
  reducerPath: 'guidesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('Authorization', `Token ${token}`)
      }

      return headers
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (build) => ({
    getGuides: build.query<[Guide], void>({
      query: () => 'guides/',
    }),
    getGuide: build.query<Guide, string>({
      query: (id) => `guides/${id}/`,
      // providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    addGuide: build.mutation<Guide, Partial<Guide>>({
      query: (body) => ({
        url: `guides/`,
        method: 'POST',
        body,
      }),
    }),
    updateGuide: build.mutation<void, Pick<Guide, 'id'> & Partial<Guide>>({
      query: ({ id, ...patch }) => ({
        url: `guides/${id}/`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          guidesApi.util.updateQueryData('getGuide', id.toString(), (draft) => {
            Object.assign(draft, patch)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      // invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    }),
    deleteGuide: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `guides/${id}/`,
          method: 'DELETE',
        }
      },
      // invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
})

export const {
  useGetGuidesQuery,
  useAddGuideMutation,
  useLazyGetGuidesQuery,
  useLazyGetGuideQuery,
  useGetGuideQuery,
  useUpdateGuideMutation,
  useDeleteGuideMutation,
} = guidesApi
export const { useGetArtifactsQuery, useGetArtifactQuery } = artifactsApi
