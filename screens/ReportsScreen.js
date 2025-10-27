import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ReportContext } from '../context/ReportContext';
import ReportCard from '../components/ReportCard';

const COLORS = {
  background: '#E8E3E1',
  primaryText: '#000',
  secondaryText: '#555',
  card: '#fff',
  accent: '#4AC87F',
  danger: '#FF4A7F',
};

export default function ReportsScreen({ navigation, userRole = 'citizen' }) {
  const { reports, updateReport } = useContext(ReportContext);
  const [query, setQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

  // 🔹 Filter reports by issue or city
  const filteredReports = reports.filter(
    (r) =>
      r.category?.toLowerCase().includes(query.toLowerCase()) ||
      r.city?.toLowerCase().includes(query.toLowerCase())
  );

  // 🔹 Handle when a report is clicked
  const handleReportPress = (report) => {
    setSelectedReport(report);
    setStatus(report.status);
    setNote(report.note || '');

    if (userRole === 'admin') {
      setModalVisible(true);
    } else {
      // Citizen view mode
      Alert.alert(
        report.category,
        `${report.description}\n\nLocation: ${report.address}\nMunicipality: ${report.municipality}`,
        [{ text: 'Close', style: 'cancel' }]
      );
    }
  };

  // 🔹 Save updates (for admin)
  const handleSave = () => {
    if (!selectedReport) return;
    updateReport(selectedReport.id, { status, note });
    setModalVisible(false);
    Alert.alert('✅ Updated', 'Report status and note have been updated.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.title}>Reports</Text>
        <Text style={styles.subtitle}>
          {userRole === 'admin'
            ? 'Manage reports from citizens'
            : 'View reports submitted in your city'}
        </Text>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            placeholder="Search by issue or city..."
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* Report List */}
        {filteredReports.length > 0 ? (
          <FlatList
            data={filteredReports}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleReportPress(item)}>
                <ReportCard report={item} />
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        ) : (
          <Text style={styles.noReportsText}>No reports found.</Text>
        )}
      </View>

      {/* --- Admin Modal --- */}
      {userRole === 'admin' && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Update Report</Text>
              <Text style={styles.modalId}>ID: {selectedReport?.id}</Text>
              <Text style={styles.modalDesc}>
                {selectedReport?.description || 'No description available.'}
              </Text>

              {/* Change Status */}
              <Text style={styles.modalLabel}>Change Status</Text>
              <View style={styles.statusRow}>
                {['In Progress', 'Resolved', 'Rejected'].map((s) => (
                  <TouchableOpacity
                    key={s}
                    onPress={() => setStatus(s)}
                    style={[
                      styles.statusButton,
                      status === s && { backgroundColor: COLORS.accent },
                    ]}
                  >
                    <Text style={styles.statusText}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Add Note */}
              <Text style={styles.modalLabel}>Add Note</Text>
              <TextInput
                style={styles.noteInput}
                multiline
                value={note}
                onChangeText={setNote}
                placeholder="Add admin note..."
              />

              {/* Buttons */}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    { backgroundColor: COLORS.accent },
                  ]}
                  onPress={handleSave}
                >
                  <Text style={{ color: '#fff' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primaryText,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.secondaryText,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    marginLeft: 10,
  },
  noReportsText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 50,
    fontSize: 16,
  },
  // --- Modal ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  modalId: {
    color: '#555',
    marginBottom: 5,
  },
  modalDesc: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  modalLabel: {
    marginTop: 10,
    fontWeight: '600',
  },
  statusRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  statusButton: {
    backgroundColor: '#55C2E7',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  statusText: {
    color: '#fff',
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    minHeight: 60,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
});
