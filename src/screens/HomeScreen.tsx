import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import StudentList from '../components/StudentList';
import { fetchStudents, deleteStudent } from '../services/api';
import { Student } from '../types';
import { getPreference } from '../services/preferences';
import Toast from 'react-native-toast-message';
import { useTheme } from '../context/ThemeContext';

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [students, setStudents] = useState<Student[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const loadStudents = async () => {
    try {
      setLoading(true); // Start loading
      const data = await fetchStudents();
      setStudents(filter && filter !== 'All' ? data.filter(s => s.enrollmentStatus === filter) : data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load students',
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const loadPreferences = async () => {
    try {
      const savedFilter = await getPreference('filterStatus');
      if (savedFilter) setFilter(savedFilter);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load preferences',
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadStudents();
      loadPreferences();
    }, [filter])
  );

  const handleDelete = async (id: string) => {
    try {
      setLoading(true); // Start loading during delete
      await deleteStudent(id);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Student deleted successfully',
      });
      await loadStudents(); // Reload students after deletion
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete student',
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Student Management</Text>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.button} />
        </View>
      ) : students.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.text }]}>No students found</Text>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.button }]}
            onPress={() => navigation.navigate('Add Student')}
          >
            <Text style={styles.addButtonText}>Add Student</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <StudentList students={students} onDelete={handleDelete} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
  },
  addButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff', // White text as per previous requirement
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;