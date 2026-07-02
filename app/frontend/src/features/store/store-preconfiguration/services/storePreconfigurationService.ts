import type {
  StorePreconfigurationPayload,
  StorePreconfigurationResult,
} from '../types/storePreconfiguration'

export type SubmitStorePreconfiguration = (
  payload: StorePreconfigurationPayload,
) => Promise<StorePreconfigurationResult>

export const submitStorePreconfiguration: SubmitStorePreconfiguration = async (payload) => {
  return {
    ok: true,
    payload,
  }
}
