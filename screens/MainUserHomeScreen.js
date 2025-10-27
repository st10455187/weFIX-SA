import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import reportsSeed from '../data/reportsSeed.json';

const COLORS = {
  background: '#E8E3E1',
  cardBackground: '#FFFFFF',
  primaryText: '#000000',
  secondaryText: '#4c4c4c',
};

export default function MainUserHomeScreen({ navigation }) {
  const [reports, setReports] = useState(reportsSeed);
  const [date, setDate] = useState({ day: '', date: '' });

  // Format date
  useEffect(() => {
    const today = new Date();
    const weekday = today.toLocaleDateString(undefined, { weekday: 'long' });
    const dayMonth = today.toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'long',
    });
    setDate({ day: weekday, date: dayMonth });
  }, []);

  // Report stats
  const openReports = reports.filter((r) => r.status === 'Open').length;
  const inProgress = reports.filter((r) => r.status === 'In Progress').length;
  const resolved = reports.filter((r) => r.status === 'Resolved').length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >


        {/* Date and Greeting */}
        <Text style={styles.dateText}>{date.day}</Text>
        <Text style={styles.dateBold}>{date.date}</Text>
        <Text style={styles.greeting}>Hi Bonolo.</Text>

        {/* Cards Section */}
        <TouchableOpacity
          style={[styles.card, { borderLeftColor: '#FF4A4A' }]}
          onPress={() => navigation.navigate('CitizenHomeScreen')}

        >
          <View style={styles.cardIcon}>
            <Ionicons name="alert-circle" size={30} color="#FF4A4A" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Report an Issue</Text>
            <Text style={styles.cardSubtitle}>
              Report service problems in your area
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { borderLeftColor: '#FFD43B' }]} onPress={() => navigation.navigate('UtilityOutageScreen')}>
          <View style={styles.cardIcon}>
            <Ionicons name="flash" size={30} color="#FFD43B" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Utility Outages</Text>
            <Text style={styles.cardSubtitle}>
              Check current outages and maintenance
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { borderLeftColor: '#4AC87F' }]} onPress={() => navigation.navigate('WasteScheduleScreen')}>
          <View style={styles.cardIcon}>
            <Ionicons name="trash" size={30} color="#4AC87F" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Waste Schedule</Text>
            <Text style={styles.cardSubtitle}>
              View collection dates and report issues
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>

        {/* Summary */}
        <Text style={styles.sectionTitle}>My reports summary</Text>
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: '#FFAC5D' }]}>
            <Text style={styles.summaryNumber}>{openReports}</Text>
            <Text style={styles.summaryLabel}>Open</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#55C2E7' }]}>
            <Text style={styles.summaryNumber}>{inProgress}</Text>
            <Text style={styles.summaryLabel}>In progress</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#4AC87F' }]}>
            <Text style={styles.summaryNumber}>{resolved}</Text>
            <Text style={styles.summaryLabel}>Resolved</Text>
          </View>
        </View>

        {/* Recent Reports */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
          Recent reports
        </Text>


        <View style={{ height: 100 }} />
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  dateText: { fontSize: 16, color: COLORS.secondaryText },
  dateBold: { fontSize: 26, fontWeight: '800', color: COLORS.primaryText },
  greeting: { fontSize: 24, fontWeight: '600', color: COLORS.secondaryText, marginBottom: 20 },

  // Cards
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderLeftWidth: 6,
  },
  cardIcon: {
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.primaryText },
  cardSubtitle: { fontSize: 13, color: COLORS.secondaryText },

  // Summary
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.primaryText, marginVertical: 15 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    flex: 1,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  summaryNumber: { fontSize: 22, fontWeight: '800', color: '#fff' },
  summaryLabel: { fontSize: 13, fontWeight: '500', color: '#fff' },

  // Report card
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  reportImage: { width: 100, height: 100, borderRadius: 10, marginRight: 10 },
  reportTitle: { fontSize: 16, fontWeight: '700', color: '#000' },
  reportDesc: { fontSize: 13, color: '#555', marginVertical: 4 },
  reportStatus: { fontSize: 13, fontWeight: '700' },

});
