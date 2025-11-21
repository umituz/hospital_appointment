import React, { useMemo } from "react";
import { FilterSheet, type FilterOption } from "@umituz/react-native-filter";
import { useLocalization } from "@umituz/react-native-localization";
import { Department } from "@/domains/appointments/types";

interface DepartmentPickerProps {
  visible: boolean;
  departments: Department[];
  selectedDepartmentId?: string;
  onSelect: (departmentId: string) => void;
  onClose: () => void;
}

export const DepartmentPicker: React.FC<DepartmentPickerProps> = ({
  visible,
  departments,
  selectedDepartmentId,
  onSelect,
  onClose,
}) => {
  const { t } = useLocalization();

  const filterOptions: FilterOption[] = useMemo(
    () =>
      departments.map((dept) => ({
        id: dept.id.toString(),
        label: dept.name,
      })),
    [departments],
  );

  const handleFilterSelect = (filterId: string) => {
    if (filterId && filterId !== selectedDepartmentId) {
      onSelect(filterId);
    }
    onClose();
  };

  const handleClear = () => {
    onSelect("");
    onClose();
  };

  return (
    <FilterSheet
      visible={visible}
      options={filterOptions}
      selectedIds={selectedDepartmentId ? [selectedDepartmentId] : []}
      onFilterPress={handleFilterSelect}
      onClearFilters={handleClear}
      onClose={onClose}
      title={t("doctors.fields.department")}
    />
  );
};
