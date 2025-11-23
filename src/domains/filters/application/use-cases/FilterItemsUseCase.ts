import type { FilterCriteria } from "../../types";
import type { IFilterRepository } from "../ports";

export class FilterItemsUseCase<T, F extends FilterCriteria> {
  constructor(private repository: IFilterRepository<T, F>) {}

  execute(items: T[], criteria: F): T[] {
    return this.repository.filter(items, criteria);
  }
}
