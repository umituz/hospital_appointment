export interface APIResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface BaseHookReturn {
  loading: boolean;
  error: string | null;
}

export interface MutationHookReturn<T, P = any> extends BaseHookReturn {
  mutate: (params: P) => Promise<T>;
  data: T | null;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
