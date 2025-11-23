import type {
  FilterCriteria,
  FilterOption,
  FilterRepository,
} from "../../types";

export abstract class BaseFilterRepository<T, F extends FilterCriteria>
  implements FilterRepository<T, F>
{
  abstract filter(items: T[], criteria: F): T[];

  getFilterOptions(items: T[], filterKey: keyof F): FilterOption[] {
    const values = this.extractUniqueValues(items, String(filterKey));
    return values.map((value, index) => ({
      id: `${String(filterKey)}-${index}`,
      label: String(value),
      value: String(value),
    }));
  }

  protected abstract extractUniqueValues(
    items: T[],
    filterKey: string,
  ): unknown[];

  protected applySearchFilter(
    items: T[],
    searchQuery: string,
    searchFields: (keyof T)[],
  ): T[] {
    if (!searchQuery?.trim()) {
      return items;
    }

    const query = searchQuery.toLowerCase();
    return items.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        return value && String(value).toLowerCase().includes(query);
      }),
    );
  }

  protected applySingleFilter<TValue>(
    items: T[],
    filterValue: TValue | null,
    filterField: keyof T,
  ): T[] {
    if (!filterValue) {
      return items;
    }

    return items.filter((item) => {
      const itemValue = item[filterField];
      return itemValue === filterValue;
    });
  }

  protected applyMultiFilter<TValue>(
    items: T[],
    filterValues: TValue[],
    filterField: keyof T,
  ): T[] {
    if (!filterValues?.length) {
      return items;
    }

    return items.filter((item) => {
      const itemValue = item[filterField];
      return filterValues.includes(itemValue as TValue);
    });
  }
}
