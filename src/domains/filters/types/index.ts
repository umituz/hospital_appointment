export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface BaseFilter<T = string | null> {
  id: string;
  type: "single" | "multi" | "range" | "search";
  value: T;
  label: string;
  placeholder?: string;
  options?: FilterOption[];
}

export interface SingleSelectFilter extends BaseFilter<string | null> {
  type: "single";
}

export interface MultiSelectFilter extends BaseFilter<string[]> {
  type: "multi";
}

export interface RangeFilter extends BaseFilter<{ min: number; max: number }> {
  type: "range";
}

export interface SearchFilter extends BaseFilter<string> {
  type: "search";
}

export type Filter =
  | SingleSelectFilter
  | MultiSelectFilter
  | RangeFilter
  | SearchFilter;

export interface FilterGroup {
  id: string;
  filters: Filter[];
  label: string;
}

export interface FilterState {
  [filterId: string]: Filter["value"];
}

export interface FilterCriteria {
  searchQuery?: string;
  [key: string]: unknown;
}

export interface DoctorFilterCriteria extends FilterCriteria {
  specialty?: string | null;
  hospital?: string | null;
}

export interface HospitalFilterCriteria extends FilterCriteria {
  city?: string | null;
}

export interface FilterRepository<T, F extends FilterCriteria> {
  filter(items: T[], criteria: F): T[];
  getFilterOptions(items: T[], filterKey: keyof F): FilterOption[];
}

export interface FilterOptionsProvider<T> {
  getOptions(items: T[]): FilterOption[];
}
