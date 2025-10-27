import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  background: '#E8E3E1',
  primaryText: '#000',
  secondaryText: '#555',
  card: '#fff',
};

export default function UtilityOutageScreen({ navigation }) {  // ✅ FIXED HERE
  const [selectedDate, setSelectedDate] = useState('');

  // Simulated upcoming outages
  const outages = {
    '2025-11-02': { name: 'Power Maintenance - Zone 1', time: '08:00 - 12:00' },
    '2025-11-10': { name: 'Water Pipe Replacement - Zone 3', time: '09:00 - 15:00' },
    '2025-11-18': { name: 'Electric Grid Upgrade - CBD Area', time: '07:30 - 11:00' },
  };

  // Marked dates on calendar
  const markedDates = Object.keys(outages).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: '#FF4A4A', selected: selectedDate === date };
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ✅ Back Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Utility Outages</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Upcoming Utility Outages</Text>

        {/* Calendar */}
        <Calendar
          markedDates={markedDates}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          theme={{
            backgroundColor: COLORS.background,
            calendarBackground: COLORS.card,
            selectedDayBackgroundColor: '#FF4A4A',
            selectedDayTextColor: '#fff',
            todayTextColor: '#FF4A4A',
            dayTextColor: COLORS.primaryText,
            arrowColor: COLORS.primaryText,
            monthTextColor: COLORS.primaryText,
          }}
          style={styles.calendar}
        />

        {/* Selected Outage Details */}
        <View style={styles.detailsContainer}>
          {selectedDate && outages[selectedDate] ? (
            <>
              <Text style={styles.detailTitle}>{outages[selectedDate].name}</Text>
              <Text style={styles.detailTime}>Time: {outages[selectedDate].time}</Text>
            </>
          ) : (
            <Text style={styles.noEvent}>Select a date to view outage details.</Text>
          )}
        </View>

        {/* Full List */}
        <Text style={styles.sectionTitle}>All Scheduled Outages</Text>
        {Object.keys(outages).map((date) => (
          <View key={date} style={styles.eventCard}>
            <Text style={styles.eventDate}>{date}</Text>
            <Text style={styles.eventName}>{outages[date].name}</Text>
            <Text style={styles.eventTime}>{outages[date].time}</Text>
          </View>
        ))}
      </ScrollView>
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
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 15,
    color: COLORS.primaryText,
  },
  calendar: {
    borderRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  detailTime: {
    fontSize: 15,
    color: COLORS.secondaryText,
    marginTop: 5,
  },
  noEvent: {
    fontSize: 15,
    color: COLORS.secondaryText,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  eventCard: {
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  eventDate: { fontWeight: '700', color: '#FF4A4A' },
  eventName: { fontSize: 16, fontWeight: '600', color: COLORS.primaryText },
  eventTime: { color: COLORS.secondaryText },
});
