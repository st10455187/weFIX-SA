import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SummaryCard from '../components/SummaryCard';
import ReportCard from '../components/ReportCard';
import { ReportContext } from '../context/ReportContext'; // ✅ Import context

const COLORS = {
  background: '#E8E3E1',
  primaryText: '#000',
  secondaryText: '#4C4C4C',
};

const getFormattedDate = () => {
  const date = new Date();
  const optionsWeekday = { weekday: 'long' };
  const optionsDate = { day: '2-digit', month: 'long' };
  return {
    weekday: date.toLocaleDateString(undefined, optionsWeekday),
    dayMonth: date.toLocaleDateString(undefined, optionsDate),
  };
};

export default function AdminHomeScreen({ navigation }) {
  const { reports, updateReport } = useContext(ReportContext); // ✅ Use shared reports
  const [date, setDate] = useState(getFormattedDate());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

  // Keep date refreshed
  useEffect(() => {
    const timer = setInterval(() => setDate(getFormattedDate()), 60000);
    return () => clearInterval(timer);
  }, []);

  const total = reports.length;
  const rejected = reports.filter((r) => r.status === 'Rejected').length;
  const inProgress = reports.filter((r) => r.status === 'In Progress').length;
  const resolved = reports.filter((r) => r.status === 'Resolved').length;

  const summaryData = [
    { title: 'All reports', value: total, color: '#FFAC5D' },
    { title: 'Rejected', value: rejected, color: '#FF4A7F' },
    { title: 'In Progress', value: inProgress, color: '#55C2E7' },
    { title: 'Resolved', value: resolved, color: '#4AC87F' },
  ];

  // --- Handle Report Click ---
  const handleReportPress = (report) => {
    setSelectedReport(report);
    setStatus(report.status);
    setNote(report.note || '');
    setModalVisible(true);
  };

  // --- Save Admin Updates ---
  const handleSave = () => {
    if (!selectedReport) return;

    updateReport(selectedReport.id, { status, note }); // ✅ Save to global context

    setModalVisible(false);
    Alert.alert('Report Updated', 'Status and note have been saved.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Date + Greeting */}
        <Text style={styles.dateText}>{date.weekday}</Text>
        <Text style={styles.dateBold}>{date.dayMonth}</Text>
        <Text style={styles.greeting}>Hi Bonolo.</Text>

        {/* Summary Section */}
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.summaryGrid}>
          {summaryData.map((item) => (
            <View
              key={item.title}
              style={[styles.summaryCard, { backgroundColor: item.color }]}
            >
              <Text style={styles.summaryValue}>{item.value}</Text>
              <Text style={styles.summaryTitle}>{item.title}</Text>
            </View>
          ))}
        </View>

        {/* Reports Section */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Reports</Text>
        <FlatList
          data={reports.slice(0, 5)} // ✅ Pulls from context
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <ReportCard report={item} onPress={() => handleReportPress(item)} />
          )}
        />
      </ScrollView>

      {/* --- Modal --- */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Report</Text>
            <Text>ID: {selectedReport?.id}</Text>
            <Text>Description: {selectedReport?.description}</Text>

            <Text style={styles.modalLabel}>Change Status</Text>
            <View style={styles.statusRow}>
              {['In Progress', 'Resolved', 'Rejected'].map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setStatus(s)}
                  style={[
                    styles.statusButton,
                    status === s && { backgroundColor: '#4AC87F' },
                  ]}
                >
                  <Text style={styles.statusText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalLabel}>Add Note</Text>
            <TextInput
              style={styles.noteInput}
              multiline
              value={note}
              onChangeText={setNote}
              placeholder="Add admin note..."
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#4AC87F' }]}
                onPress={handleSave}
              >
                <Text style={{ color: '#fff' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 20,
  },
  dateText: {
    marginTop: 20,
    fontSize: 16,
    color: COLORS.secondaryText,
  },
  dateBold: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primaryText,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.secondaryText,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryCard: {
    width: '48%',
    borderRadius: 15,
    paddingVertical: 25,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  summaryTitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
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
  modalLabel: {
    marginTop: 15,
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
