import type { FilterCriteria, FilterRepository } from "../../types";

export interface IFilterRepository<T, F extends FilterCriteria>
  extends FilterRepository<T, F> {}
