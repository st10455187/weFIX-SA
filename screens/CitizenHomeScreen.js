import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CitizenHomeScreen({ navigation }) {
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUserAndReports();
  }, []);

  const loadUserAndReports = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }

      const allReports = await AsyncStorage.getItem('reports');
      if (allReports) {
        const reportsData = JSON.parse(allReports);
        // Filter reports for current user
        const userReports = reportsData.filter(report => 
          report.submittedBy === JSON.parse(userData).username
        );
        setReports(userReports.reverse().slice(0, 10)); // Show latest 10 reports
      }
    } catch (error) {
      console.error('Error loading data:', error);
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

  const renderReportItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.reportCard}
      onPress={() => navigation.navigate('CitizenReportDetail', { reportId: item.id })}
    >
      <View style={styles.reportHeader}>
        <Text style={styles.reportTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.reportCategory}>{item.category}</Text>
      <Text style={styles.reportLocation}>{item.location}, {item.municipality}</Text>
      <Text style={styles.reportDate}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
      {item.adminNote && (
        <View style={styles.noteContainer}>
          <Text style={styles.noteLabel}>Admin Note:</Text>
          <Text style={styles.noteText}>{item.adminNote}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Reports</Text>
      <Text style={styles.subheader}>Welcome back, {user?.username}</Text>
      
      {reports.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No reports submitted yet</Text>
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => navigation.navigate('CitizenReports')}
          >
            <Text style={styles.submitButtonText}>Submit Your First Report</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={reports}
          renderItem={renderReportItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('CitizenReports')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
    marginBottom: 5,
    color: '#1C1C1E',
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
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
    marginBottom: 8,
  },
  reportDate: {
    color: '#999',
    fontSize: 12,
  },
  noteContainer: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  noteLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 4,
    color: '#007AFF',
  },
  noteText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
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
    marginBottom: 20,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});