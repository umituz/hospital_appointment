import type { FilterCriteria, FilterRepository } from "../../types";

export class FilterService<T, F extends FilterCriteria> {
  constructor(private repository: FilterRepository<T, F>) {}

  filter(items: T[], criteria: F): T[] {
    return this.repository.filter(items, criteria);
  }

  getFilterOptions(items: T[], filterKey: keyof F) {
    return this.repository.getFilterOptions(items, filterKey);
  }
}
