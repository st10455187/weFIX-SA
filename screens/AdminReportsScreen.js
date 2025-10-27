import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MUNICIPALITY_DATA = {
  categories: [
    'Water and Sanitation',
    'Electricity',
    'Roads and Transport',
    'Waste Management',
    'Health',
    'Education',
    'Public Safety',
    'Other'
  ],
  municipalities: [
    'City of Cape Town',
    'eThekwini Metropolitan',
    'City of Johannesburg',
    'City of Tshwane',
    'Nelson Mandela Bay',
    'Buffalo City',
    'Mangaung Metropolitan',
    'Other'
  ]
};

export default function AdminReportsScreen({ navigation }) {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchQuery, selectedCategory, selectedMunicipality, selectedStatus]);

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
    let filtered = reports;

    if (searchQuery) {
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(report => report.category === selectedCategory);
    }

    if (selectedMunicipality) {
      filtered = filtered.filter(report => report.municipality === selectedMunicipality);
    }

    if (selectedStatus) {
      filtered = filtered.filter(report => report.status === selectedStatus);
    }

    setFilteredReports(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedMunicipality('');
    setSelectedStatus('');
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
      onPress={() => navigation.navigate('AdminReportDetail', { reportId: item.id })}
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
      <Text style={styles.header}>All Reports</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search reports..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterContainer}>
        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>Category:</Text>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={setSelectedCategory}
          >
            <Picker.Item label="All Categories" value="" />
            {MUNICIPALITY_DATA.categories.map(cat => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>Municipality:</Text>
          <Picker
            selectedValue={selectedMunicipality}
            style={styles.picker}
            onValueChange={setSelectedMunicipality}
          >
            <Picker.Item label="All Municipalities" value="" />
            {MUNICIPALITY_DATA.municipalities.map(mun => (
              <Picker.Item key={mun} label={mun} value={mun} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>Status:</Text>
          <Picker
            selectedValue={selectedStatus}
            style={styles.picker}
            onValueChange={setSelectedStatus}
          >
            <Picker.Item label="All Statuses" value="" />
            <Picker.Item label="Submitted" value="submitted" />
            <Picker.Item label="In Progress" value="in progress" />
            <Picker.Item label="Resolved" value="resolved" />
          </Picker>
        </View>

        {(searchQuery || selectedCategory || selectedMunicipality || selectedStatus) && (
          <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
            <Text style={styles.clearFiltersText}>Clear Filters</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.resultsCount}>
        Showing {filteredReports.length} of {reports.length} reports
      </Text>

      {filteredReports.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {reports.length === 0 ? 'No reports submitted yet' : 'No reports match your filters'}
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
  searchInput: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  filterContainer: {
    marginBottom: 15,
  },
  pickerWrapper: {
    marginBottom: 15,
  },
  pickerLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#666',
    fontSize: 14,
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  clearFiltersButton: {
    backgroundColor: '#8E8E93',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  clearFiltersText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
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
});