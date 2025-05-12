import React, { memo, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { Student } from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';

interface Props {
  students: Student[];
  onDelete: (id: string) => void;
}

const StudentList: React.FC<Props> = ({ students, onDelete }) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleDeletePress = (student: Student) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      onDelete(selectedStudent.id);
    }
    setModalVisible(false);
    setSelectedStudent(null);
  };

  const cancelDelete = () => {
    setModalVisible(false);
    setSelectedStudent(null);
  };

  const renderItem = ({ item }: { item: Student }) => (
    <View style={[styles.itemContainer, { backgroundColor: colors.cardBackground, shadowColor: colors.text }]}>
      <Image source={{ uri: item.photo || 'https://via.placeholder.com/50' }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.email, { color: colors.secondaryText }]}>{item.email}</Text>
        <Text style={[styles.status, { color: colors.secondaryText }]}>{item.enrollmentStatus}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeletePress(item)}>
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.list, { backgroundColor: colors.background }]}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Delete Student
            </Text>
            <Text style={[styles.modalMessage, { color: colors.secondaryText }]}>
              Are you sure you want to delete {selectedStudent?.name}?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.button }]}
                onPress={cancelDelete}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#FF3B30' }]}
                onPress={confirmDelete}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  list: { padding: 10 },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold' },
  email: { fontSize: 14 },
  status: { fontSize: 14 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff', // Fixed white color for modal button text
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default memo(StudentList);