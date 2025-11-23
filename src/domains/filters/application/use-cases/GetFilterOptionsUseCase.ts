import type { FilterCriteria, FilterOption } from "../../types";
import type { IFilterRepository } from "../ports";

export class GetFilterOptionsUseCase<T, F extends FilterCriteria> {
  constructor(private repository: IFilterRepository<T, F>) {}

  execute(items: T[], filterKey: keyof F): FilterOption[] {
    return this.repository.getFilterOptions(items, filterKey);
  }
}
