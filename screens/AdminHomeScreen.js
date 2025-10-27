import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminHomeScreen({ navigation }) {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('submitted');
  const [adminNote, setAdminNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchQuery]);

  const loadReports = async () => {
    try {
      const allReports = await AsyncStorage.getItem('reports');
      if (allReports) {
        const reportsData = JSON.parse(allReports);
        setReports(reportsData.reverse()); // Show latest first
      }
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  };

  const filterReports = () => {
    if (searchQuery) {
      const filtered = reports.filter(report =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports);
    }
  };

  const updateReportStatus = async () => {
    if (!selectedReport) return;

    try {
      const updatedReports = reports.map(report =>
        report.id === selectedReport.id
          ? { 
              ...report, 
              status, 
              adminNote: adminNote.trim(), 
              updatedAt: new Date().toISOString() 
            }
          : report
      );

      await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));
      setReports(updatedReports);
      setModalVisible(false);
      setAdminNote('');
      Alert.alert('Success', 'Report updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update report');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return '#FF9500';
      case 'in progress': return '#007AFF';
      case 'resolved': return '#34C759';
      default: return '#8E8E93';
    }
  };

  const getStatusCount = (status) => {
    return reports.filter(report => report.status === status).length;
  };

  const renderReportItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.reportCard}
      onPress={() => {
        setSelectedReport(item);
        setStatus(item.status);
        setAdminNote(item.adminNote || '');
        setModalVisible(true);
      }}
    >
      <View style={styles.reportHeader}>
        <Text style={styles.reportTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.reportCategory}>{item.category}</Text>
      <Text style={styles.reportLocation}>{item.location}, {item.municipality}</Text>
      <Text style={styles.reportSubmittedBy}>Submitted by: {item.submittedBy}</Text>
      <Text style={styles.reportDate}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
      {item.adminNote && (
        <Text style={styles.adminNote}>Note: {item.adminNote}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reports Dashboard</Text>
      
      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{getStatusCount('submitted')}</Text>
          <Text style={styles.statLabel}>Submitted</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{getStatusCount('in progress')}</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{getStatusCount('resolved')}</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{reports.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search reports by title, category, location, or user..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text style={styles.sectionTitle}>All Reports ({filteredReports.length})</Text>

      {filteredReports.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {reports.length === 0 ? 'No reports submitted yet' : 'No reports match your search'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredReports}
          renderItem={renderReportItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Report Status</Text>
            
            {selectedReport && (
              <>
                <View style={styles.reportDetails}>
                  <Text style={styles.detailLabel}>Title:</Text>
                  <Text style={styles.detailValue}>{selectedReport.title}</Text>
                  
                  <Text style={styles.detailLabel}>Category:</Text>
                  <Text style={styles.detailValue}>{selectedReport.category}</Text>
                  
                  <Text style={styles.detailLabel}>Location:</Text>
                  <Text style={styles.detailValue}>{selectedReport.location}, {selectedReport.municipality}</Text>
                  
                  <Text style={styles.detailLabel}>Submitted by:</Text>
                  <Text style={styles.detailValue}>{selectedReport.submittedBy}</Text>
                  
                  <Text style={styles.detailLabel}>Date:</Text>
                  <Text style={styles.detailValue}>{new Date(selectedReport.date).toLocaleDateString()}</Text>
                  
                  <Text style={styles.detailLabel}>Description:</Text>
                  <Text style={styles.detailValue}>{selectedReport.description}</Text>
                </View>

                <Text style={styles.label}>Status:</Text>
                <View style={styles.statusContainer}>
                  {['submitted', 'in progress', 'resolved'].map((stat) => (
                    <TouchableOpacity
                      key={stat}
                      style={[
                        styles.statusOption,
                        status === stat && [styles.statusOptionSelected, { backgroundColor: getStatusColor(stat) }]
                      ]}
                      onPress={() => setStatus(stat)}
                    >
                      <Text style={[
                        styles.statusOptionText,
                        status === stat && styles.statusOptionTextSelected
                      ]}>
                        {stat.charAt(0).toUpperCase() + stat.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.label}>Admin Note:</Text>
                <TextInput
                  style={styles.noteInput}
                  multiline
                  numberOfLines={4}
                  value={adminNote}
                  onChangeText={setAdminNote}
                  placeholder="Add a note for the citizen..."
                  textAlignVertical="top"
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.updateButton]}
                    onPress={updateReportStatus}
                  >
                    <Text style={styles.updateButtonText}>Update Status</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1C1C1E',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1C1C1E',
  },
  reportCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
    color: '#1C1C1E',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  reportCategory: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  reportLocation: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  reportSubmittedBy: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  reportDate: {
    color: '#999',
    fontSize: 12,
  },
  adminNote: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    padding: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#1C1C1E',
  },
  reportDetails: {
    marginBottom: 15,
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#1C1C1E',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#1C1C1E',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statusOption: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  statusOptionSelected: {
    borderWidth: 0,
  },
  statusOptionText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  statusOptionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 14,
    minHeight: 80,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#F2F2F7',
  },
  updateButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});