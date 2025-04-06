import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, SectionList, Alert } from 'react-native';

const ContactsApp = () => {
  // Hardcoded contact data grouped by category
  const initialContacts = [
    {
      title: 'Family',
      data: [
        { id: '1', name: 'Mom', phone: '03001234567', group: 'Family' },
        { id: '2', name: 'Dad', phone: '03001234568', group: 'Family' },
        { id: '3', name: 'Sister', phone: '03001234569', group: 'Family' },
      ],
    },
    {
      title: 'Friends',
      data: [
        { id: '4', name: 'Ali', phone: '03001234570', group: 'Friends' },
        { id: '5', name: 'Ahmed', phone: '03001234571', group: 'Friends' },
        { id: '6', name: 'Sara', phone: '03001234572', group: 'Friends' },
      ],
    },
    {
      title: 'Work',
      data: [
        { id: '7', name: 'Boss', phone: '03001234573', group: 'Work' },
        { id: '8', name: 'Manager', phone: '03001234574', group: 'Work' },
        { id: '9', name: 'Colleague', phone: '03001234575', group: 'Work' },
        { id: '10', name: 'HR', phone: '03001234576', group: 'Work' },
      ],
    },
  ];

  const [contacts, setContacts] = useState(initialContacts);
  const [searchText, setSearchText] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Filter contacts based on search text
  const filterContacts = (text) => {
    setSearchText(text);
    if (text === '') {
      setContacts(initialContacts);
    } else {
      const filtered = initialContacts.map(section => ({
        title: section.title,
        data: section.data.filter(
          contact =>
            contact.name.toLowerCase().includes(text.toLowerCase()) ||
            contact.phone.includes(text)
        ),
      })).filter(section => section.data.length > 0);
      setContacts(filtered);
    }
  };

  // Show contact details in modal
  const showContactDetails = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Contacts Manager</Text>
      
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or phone..."
        value={searchText}
        onChangeText={filterContacts}
      />
      
      {/* Contacts List */}
      <SectionList
        sections={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => showContactDetails(item)}
          >
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactPhone}>{item.phone}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No contacts found</Text>
        }
      />
      
      {/* Contact Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedContact && (
              <>
                <Text style={styles.modalTitle}>Contact Details</Text>
                <Text style={styles.detailText}>Name: {selectedContact.name}</Text>
                <Text style={styles.detailText}>Phone: {selectedContact.phone}</Text>
                <Text style={styles.detailText}>Group: {selectedContact.group}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sectionHeader: {
    backgroundColor: '#6200ee',
    color: 'white',
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  closeButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ContactsApp;
