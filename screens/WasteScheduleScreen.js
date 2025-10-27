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

export default function WasteScheduleScreen({ navigation }) {  // ✅ FIXED navigation prop
  const [selectedDate, setSelectedDate] = useState('');

  // Example waste collection schedules
  const schedules = {
    '2025-11-03': { name: 'General Waste Collection', area: 'Zone 5', time: '07:00 - 09:00' },
    '2025-11-07': { name: 'Recycling Pickup', area: 'Zone 1', time: '08:00 - 10:30' },
    '2025-11-12': { name: 'Garden Waste', area: 'Zone 4', time: '09:00 - 11:30' },
  };

  // Marked calendar dates
  const markedDates = Object.keys(schedules).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: '#4AC87F', selected: selectedDate === date };
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ✅ Back Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Waste Schedule</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Upcoming Waste Collection</Text>

        {/* Calendar */}
        <Calendar
          markedDates={markedDates}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          theme={{
            backgroundColor: COLORS.background,
            calendarBackground: COLORS.card,
            selectedDayBackgroundColor: '#4AC87F',
            selectedDayTextColor: '#fff',
            todayTextColor: '#4AC87F',
            dayTextColor: COLORS.primaryText,
            arrowColor: COLORS.primaryText,
            monthTextColor: COLORS.primaryText,
          }}
          style={styles.calendar}
        />

        {/* Selected Schedule Details */}
        <View style={styles.detailsContainer}>
          {selectedDate && schedules[selectedDate] ? (
            <>
              <Text style={styles.detailTitle}>{schedules[selectedDate].name}</Text>
              <Text style={styles.detailArea}>Area: {schedules[selectedDate].area}</Text>
              <Text style={styles.detailTime}>Time: {schedules[selectedDate].time}</Text>
            </>
          ) : (
            <Text style={styles.noEvent}>Select a date to view schedule details.</Text>
          )}
        </View>

        {/* Full Schedule List */}
        <Text style={styles.sectionTitle}>Upcoming Collections</Text>
        {Object.keys(schedules).map((date) => (
          <View key={date} style={styles.eventCard}>
            <Text style={styles.eventDate}>{date}</Text>
            <Text style={styles.eventName}>{schedules[date].name}</Text>
            <Text style={styles.eventArea}>{schedules[date].area}</Text>
            <Text style={styles.eventTime}>{schedules[date].time}</Text>
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
  detailArea: {
    fontSize: 15,
    color: COLORS.secondaryText,
    marginTop: 3,
  },
  detailTime: {
    fontSize: 15,
    color: COLORS.secondaryText,
    marginTop: 3,
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
  eventDate: { fontWeight: '700', color: '#4AC87F' },
  eventName: { fontSize: 16, fontWeight: '600', color: COLORS.primaryText },
  eventArea: { color: COLORS.secondaryText },
  eventTime: { color: COLORS.secondaryText },
});
