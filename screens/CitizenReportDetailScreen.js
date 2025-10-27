import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CitizenReportDetailScreen({ route }) {
  const { reportId } = route.params;
  const [report, setReport] = useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const allReports = await AsyncStorage.getItem('reports');
      if (allReports) {
        const reportsData = JSON.parse(allReports);
        const foundReport = reportsData.find(r => r.id === reportId);
        setReport(foundReport);
      }
    } catch (error) {
      console.error('Error loading report:', error);
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
          <Text style={styles.detailLabel}>Date Submitted:</Text>
          <Text style={styles.detailValue}>{new Date(report.date).toLocaleDateString()}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Last Updated:</Text>
          <Text style={styles.detailValue}>
            {report.updatedAt ? new Date(report.updatedAt).toLocaleDateString() : 'N/A'}
          </Text>
        </View>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{report.description}</Text>
      </View>

      {report.adminNote && (
        <View style={styles.noteSection}>
          <Text style={styles.sectionTitle}>Admin Response</Text>
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{report.adminNote}</Text>
          </View>
        </View>
      )}
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
  noteSection: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 20,
    marginBottom: 20,
  },
  noteContainer: {
    backgroundColor: '#F2F2F7',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  noteText: {
    fontSize: 14,
    color: '#1C1C1E',
    lineHeight: 20,
  },
});