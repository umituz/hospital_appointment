import { useState, useEffect } from "react";
import { DepartmentRepository } from "@/domains/appointments/infrastructure/repositories";

export function useDoctorDepartment(departmentId: string | undefined) {
  const [departmentName, setDepartmentName] = useState<string>("");

  useEffect(() => {
    const loadDepartment = async () => {
      if (!departmentId) {
        setDepartmentName("");
        return;
      }

      try {
        const repository = new DepartmentRepository();
        const departments = await repository.getAll();
        const department = departments.find(
          (d) => d.id.toString() === departmentId,
        );
        if (department) {
          setDepartmentName(department.name);
        } else {
          setDepartmentName("");
        }
      } catch {
        setDepartmentName("");
      }
    };

    loadDepartment();
  }, [departmentId]);

  return departmentName;
}
