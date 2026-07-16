type ApiRequestOptions = Omit<RequestInit, 'body' | 'method'> & {
  authToken?: string
}

type JsonBody = unknown

const API_BASE_URL = import.meta.env.VITE_API_URL ?? ''

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const buildUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  if (!API_BASE_URL) {
    return path
  }

  return `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

const buildHeaders = (options?: ApiRequestOptions) => {
  const headers = new Headers(jsonHeaders)

  if (options?.authToken) {
    headers.set('Authorization', `Bearer ${options.authToken}`)
  }

  new Headers(options?.headers).forEach((value, key) => {
    headers.set(key, value)
  })

  return headers
}

const parseResponseBody = async (response: Response) => {
  if (response.status === 204) {
    return undefined
  }

  const text = await response.text()

  if (!text) {
    return undefined
  }

  try {
    return JSON.parse(text) as unknown
  } catch {
    return text
  }
}

export class ApiError extends Error {
  public readonly body: unknown
  public readonly status: number
  public readonly url: string

  constructor(message: string, status: number, url: string, body: unknown) {
    super(message)
    this.name = 'ApiError'
    this.body = body
    this.status = status
    this.url = url
  }
}

export class ApiNetworkError extends Error {
  public readonly url: string

  constructor(message: string, url: string, cause: unknown) {
    super(message, { cause })
    this.name = 'ApiNetworkError'
    this.url = url
  }
}

const request = async <T>(
  method: string,
  path: string,
  body?: JsonBody,
  options?: ApiRequestOptions,
): Promise<T> => {
  const url = buildUrl(path)
  const requestOptions = { ...(options ?? {}) } as RequestInit & { authToken?: string }
  delete requestOptions.authToken

  requestOptions.method = method
  requestOptions.headers = buildHeaders(options)

  if (body !== undefined) {
    requestOptions.body = JSON.stringify(body)
  }

  let response: Response

  try {
    response = await fetch(url, requestOptions)
  } catch (error) {
    throw new ApiNetworkError('API request failed before receiving a response.', url, error)
  }

  const responseBody = await parseResponseBody(response)

  if (!response.ok) {
    throw new ApiError(`API request failed with status ${response.status}.`, response.status, url, responseBody)
  }

  return responseBody as T
}

export const apiClient = {
  get<T>(path: string, options?: ApiRequestOptions): Promise<T> {
    return request<T>('GET', path, undefined, options)
  },

  post<T>(path: string, body?: JsonBody, options?: ApiRequestOptions): Promise<T> {
    return request<T>('POST', path, body, options)
  },

  put<T>(path: string, body?: JsonBody, options?: ApiRequestOptions): Promise<T> {
    return request<T>('PUT', path, body, options)
  },

  patch<T>(path: string, body?: JsonBody, options?: ApiRequestOptions): Promise<T> {
    return request<T>('PATCH', path, body, options)
  },

  delete<T>(path: string, options?: ApiRequestOptions): Promise<T> {
    return request<T>('DELETE', path, undefined, options)
  },
}
