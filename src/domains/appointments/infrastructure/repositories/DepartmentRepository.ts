import { Department } from '../../types';
import { storageService } from '../../../storage/infrastructure/services';

const STORAGE_KEY = '@hospital_appointment:departments';

const SAMPLE_DEPARTMENTS: Department[] = [
  { id: '1', name: 'Kardiyoloji', hospital_id: '1' },
  { id: '2', name: 'Nöroloji', hospital_id: '1' },
  { id: '3', name: 'Ortopedi', hospital_id: '1' },
  { id: '4', name: 'Dahiliye', hospital_id: '1' },
  { id: '5', name: 'Kardiyoloji', hospital_id: '2' },
  { id: '6', name: 'Nöroloji', hospital_id: '2' },
  { id: '7', name: 'Ortopedi', hospital_id: '2' },
  { id: '8', name: 'Dahiliye', hospital_id: '2' },
  { id: '9', name: 'Kardiyoloji', hospital_id: '3' },
  { id: '10', name: 'Nöroloji', hospital_id: '3' },
  { id: '11', name: 'Ortopedi', hospital_id: '3' },
  { id: '12', name: 'Dahiliye', hospital_id: '3' },
  { id: '13', name: 'Kardiyoloji', hospital_id: '4' },
  { id: '14', name: 'Nöroloji', hospital_id: '4' },
  { id: '15', name: 'Ortopedi', hospital_id: '4' },
  { id: '16', name: 'Dahiliye', hospital_id: '4' },
];

export class DepartmentRepository {
  async getByHospitalId(hospitalId: string | number): Promise<Department[]> {
    const stored = await storageService.getItem<Department[]>(STORAGE_KEY, []);
    let departments = stored || [];

    if (departments.length === 0) {
      await storageService.setItem(STORAGE_KEY, SAMPLE_DEPARTMENTS);
      departments = SAMPLE_DEPARTMENTS;
    }

    return departments.filter((d) => d.hospital_id.toString() === hospitalId.toString());
  }
}

