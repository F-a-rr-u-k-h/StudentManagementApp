import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { addStudent } from '../services/api';
import { Student } from '../types';
import Toast from 'react-native-toast-message';
import { useTheme } from '../context/ThemeContext';

const AddStudentScreen: React.FC = () => {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'Enrolled' | 'Graduated' | 'Alumni'>('Enrolled');
  const [photo, setPhoto] = useState<string | undefined>();
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAddStudent = async () => {
    if (!name || !email || !validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all fields correctly',
      });
      return;
    }

    try {
      await addStudent({ name, email, enrollmentStatus: status, photo });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Student added successfully',
      });
      setName('');
      setEmail('');
      setStatus('Enrolled');
      setPhoto(undefined);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add student',
      });
    }
  };

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', includeBase64: false });
      if (result.assets && result.assets[0].uri) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to select photo',
      });
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Add New Student</Text>
      <TextInput
        style={[styles.input, { borderColor: colors.border, backgroundColor: colors.cardBackground, color: colors.text }]}
        placeholder="Name"
        placeholderTextColor={colors.secondaryText}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { borderColor: colors.border, backgroundColor: colors.cardBackground, color: colors.text }]}
        placeholder="Email"
        placeholderTextColor={colors.secondaryText}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={[styles.pickerContainer, { borderColor: colors.border, backgroundColor: colors.cardBackground }]}>
        <Picker
          selectedValue={status}
          onValueChange={setStatus}
          style={[styles.picker, { color: colors.text }]}
          dropdownIconColor={colors.text} // Set dropdown arrow color
        >
          <Picker.Item label="Enrolled" value="Enrolled" />
          <Picker.Item label="Graduated" value="Graduated" />
          <Picker.Item label="Alumni" value="Alumni" />
        </Picker>
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={pickImage}>
        <Text style={styles.buttonText}>Select Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={handleAddStudent}>
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50, // Ensure consistent height
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff', // White text as per previous requirement
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddStudentScreen;