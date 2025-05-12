import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { savePreference, getPreference } from '../services/preferences';
import Toast from 'react-native-toast-message';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen: React.FC = () => {
  const { colors, theme, setTheme } = useTheme();
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    getPreference('filterStatus').then(savedFilter => setFilter(savedFilter));
  }, []);

  const handleFilterChange = async (value: string) => {
    try {
      setFilter(value);
      await savePreference('filterStatus', value);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Filter updated successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update filter',
      });
    }
  };

  const handleThemeChange = async (value: 'light' | 'dark' | 'system') => {
    try {
      setTheme(value);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Theme updated successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update theme',
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      <Text style={[styles.label, { color: colors.text }]}>Filter by Enrollment Status</Text>
      <View style={[styles.pickerContainer, { borderColor: colors.border, backgroundColor: colors.cardBackground }]}>
        <Picker
          selectedValue={filter || 'All'}
          onValueChange={handleFilterChange}
          style={[styles.picker, { color: colors.text }]}
          dropdownIconColor={colors.text} // Set dropdown arrow color
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Enrolled" value="Enrolled" />
          <Picker.Item label="Graduated" value="Graduated" />
          <Picker.Item label="Alumni" value="Alumni" />
        </Picker>
      </View>
      <Text style={[styles.label, { color: colors.text }]}>Theme</Text>
      <View style={[styles.pickerContainer, { borderColor: colors.border, backgroundColor: colors.cardBackground }]}>
        <Picker
          selectedValue={theme}
          onValueChange={handleThemeChange}
          style={[styles.picker, { color: colors.text }]}
          dropdownIconColor={colors.text} // Set dropdown arrow color
        >
          <Picker.Item label="System" value="system" />
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50, // Ensure consistent height for better appearance
  },
});

export default SettingsScreen;