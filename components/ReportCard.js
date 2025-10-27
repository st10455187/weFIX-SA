import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ReportCard = ({ report, onPress, showUser = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return '#FF9500';
      case 'in progress': return '#007AFF';
      case 'resolved': return '#34C759';
      default: return '#8E8E93';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>{report.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}>
          <Text style={styles.statusText}>{report.status}</Text>
        </View>
      </View>
      
      <Text style={styles.category}>{report.category}</Text>
      <Text style={styles.location}>{report.location}, {report.municipality}</Text>
      
      {showUser && (
        <Text style={styles.submittedBy}>Submitted by: {report.submittedBy}</Text>
      )}
      
      <Text style={styles.date}>
        {new Date(report.date).toLocaleDateString()}
      </Text>
      
      {report.adminNote && (
        <View style={styles.noteContainer}>
          <Text style={styles.noteLabel}>Admin Note:</Text>
          <Text style={styles.noteText} numberOfLines={2}>{report.adminNote}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
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
  category: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  location: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  submittedBy: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  date: {
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
});

export default ReportCard;