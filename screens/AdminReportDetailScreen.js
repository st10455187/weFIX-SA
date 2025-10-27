import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminReportDetailScreen({ route, navigation }) {
  const { reportId } = route.params;
  const [report, setReport] = useState(null);
  const [status, setStatus] = useState('submitted');
  const [adminNote, setAdminNote] = useState('');

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const allReports = await AsyncStorage.getItem('reports');
      if (allReports) {
        const reportsData = JSON.parse(allReports);
        const foundReport = reportsData.find(r => r.id === reportId);
        if (foundReport) {
          setReport(foundReport);
          setStatus(foundReport.status);
          setAdminNote(foundReport.adminNote || '');
        }
      }
    } catch (error) {
      console.error('Error loading report:', error);
    }
  };

  const updateReport = async () => {
    if (!report) return;

    try {
      const allReports = await AsyncStorage.getItem('reports');
      if (allReports) {
        const reportsData = JSON.parse(allReports);
        const updatedReports = reportsData.map(r =>
          r.id === reportId
            ? { ...r, status, adminNote: adminNote.trim(), updatedAt: new Date().toISOString() }
            : r
        );

        await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));
        Alert.alert('Success', 'Report updated successfully');
        navigation.goBack();
      }
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

  if (!report) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading report...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{report.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}>
          <Text style={styles.statusText}>{report.status}</Text>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Report Details</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Category:</Text>
          <Text style={styles.detailValue}>{report.category}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Municipality:</Text>
          <Text style={styles.detailValue}>{report.municipality}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>{report.location}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Submitted by:</Text>
          <Text style={styles.detailValue}>{report.submittedBy}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{new Date(report.date).toLocaleDateString()}</Text>
        </View>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{report.description}</Text>
      </View>

      <View style={styles.updateSection}>
        <Text style={styles.sectionTitle}>Update Report</Text>
        
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

        <TouchableOpacity style={styles.updateButton} onPress={updateReport}>
          <Text style={styles.updateButtonText}>Update Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  detailsSection: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#666',
    fontSize: 14,
  },
  detailValue: {
    color: '#1C1C1E',
    fontSize: 14,
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  descriptionSection: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: '#1C1C1E',
    lineHeight: 20,
  },
  updateSection: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1C1C1E',
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    minHeight: 100,
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});