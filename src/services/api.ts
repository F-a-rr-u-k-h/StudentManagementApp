import mockStudents from '../data/mockStudents.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Student } from '../types';

export const fetchStudents = async (): Promise<Student[]> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    const storedStudents = await AsyncStorage.getItem('students');
    return storedStudents ? JSON.parse(storedStudents) : mockStudents;
  } catch (error) {
    console.error('Error fetching students:', error);
    return mockStudents;
  }
};

export const addStudent = async (student: Omit<Student, 'id'>): Promise<Student> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newStudent: Student = { ...student, id: Math.random().toString(36).substr(2, 9) };
    const students = await fetchStudents();
    const updatedStudents = [...students, newStudent];
    await AsyncStorage.setItem('students', JSON.stringify(updatedStudents));
    return newStudent;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

export const deleteStudent = async (id: string): Promise<void> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const students = await fetchStudents();
    const updatedStudents = students.filter(student => student.id !== id);
    await AsyncStorage.setItem('students', JSON.stringify(updatedStudents));
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};