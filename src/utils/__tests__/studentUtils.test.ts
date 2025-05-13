import { countTotalStudents } from '../studentUtils';
import { Student } from '../../types';

describe('countTotalStudents', () => {
  const mockStudents: Student[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', enrollmentStatus: 'Enrolled' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', enrollmentStatus: 'Graduated' },
  ];

  it('should return 0 for an empty student array', () => {
    expect(countTotalStudents([])).toBe(0);
  });

  it('should return 1 for an array with one student', () => {
    expect(countTotalStudents([mockStudents[0]])).toBe(1);
  });

  it('should return the correct count for multiple students', () => {
    expect(countTotalStudents(mockStudents)).toBe(2);
  });

  it('should handle null or undefined students array', () => {
    expect(countTotalStudents(null as any)).toBe(0);
    expect(countTotalStudents(undefined as any)).toBe(0);
  });
});