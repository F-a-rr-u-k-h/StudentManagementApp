import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { Student } from '../../types';
import * as api from '../../services/api';
import * as preferences from '../../services/preferences';

// Mock dependencies
jest.mock('../../services/api', () => ({
  fetchStudents: jest.fn(),
  deleteStudent: jest.fn(),
}));

jest.mock('../../services/preferences', () => ({
  getPreference: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn((callback) => callback()),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

// Mock ThemeContext
const mockTheme = {
  theme: 'light',
  colors: {
    background: '#f5f5f5',
    text: '#333',
    button: '#007AFF',
    secondaryText: '#666',
    border: '#ccc',
    cardBackground: '#fff',
  },
  setTheme: jest.fn(),
};

jest.mock('../../context/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: () => mockTheme,
}));

describe('HomeScreen', () => {
  const mockStudents: Student[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', enrollmentStatus: 'Enrolled' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', enrollmentStatus: 'Graduated' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (preferences.getPreference as jest.Mock).mockResolvedValue(null);
  });

  it('displays the student count when students are loaded', async () => {
    (api.fetchStudents as jest.Mock).mockResolvedValue(mockStudents);

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText('Student Management')).toBeTruthy();
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('Jane Smith')).toBeTruthy();
    });
  });

  it('displays "No students found" and "Add Student" button when the student list is empty', async () => {
    (api.fetchStudents as jest.Mock).mockResolvedValue([]);

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText('No students found')).toBeTruthy();
      expect(getByText('Add Student')).toBeTruthy();
    });
  });

  it('shows error toast when fetchStudents fails', async () => {
    (api.fetchStudents as jest.Mock).mockRejectedValue(new Error('Failed to load'));

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(require('react-native-toast-message').show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load students',
      });
    });
  });
});