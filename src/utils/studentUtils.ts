import { Student } from '../types';

export const countTotalStudents = (students: Student[] | null | undefined): number => {
  return students ? students.length : 0;
};