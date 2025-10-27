import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Colors and styling for different report statuses
const CARD_COLORS = {
  background: '#FFFFFF',
  statusResolved: '#4AC87F',
  statusInProgress: '#55C2E7',
  statusRejected: '#FF4A7F',
  locationIcon: '#555555',
  municipalityIcon: '#555555',
  detailText: '#555555',
  descriptionText: '#777777',
  categoryText: '#000000',
};

export default function ReportCard({ report, onPress }) {
  let statusColor = CARD_COLORS.detailText;
  if (report.status === 'Resolved') statusColor = CARD_COLORS.statusResolved;
  else if (report.status === 'In Progress')
    statusColor = CARD_COLORS.statusInProgress;
  else if (report.status === 'Rejected')
    statusColor = CARD_COLORS.statusRejected;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.contentContainer}>
        <Image
          source={{
            uri:
              report.imageUrl ||
              'https://via.placeholder.com/100x100?text=Image',
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.category}>
              {report.category || 'No Category'}
            </Text>
            <Text style={[styles.status, { color: statusColor }]}>
              {report.status || 'N/A'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name="location-outline"
              size={14}
              color={CARD_COLORS.locationIcon}
            />
            <Text style={styles.detailText}>
              {report.address || 'Address Unavailable'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name="business-outline"
              size={14}
              color={CARD_COLORS.municipalityIcon}
            />
            <Text style={styles.detailText}>
              {report.municipality || 'Municipality Unavailable'}
            </Text>
          </View>

          <Text style={styles.descriptionText} numberOfLines={3}>
            {report.description || 'No description provided.'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD_COLORS.background,
    borderRadius: 15,
    padding: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  contentContainer: { flexDirection: 'row' },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  textContainer: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  category: {
    fontSize: 18,
    fontWeight: '700',
    color: CARD_COLORS.categoryText,
  },
  status: { fontSize: 13, fontWeight: '600' },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  detailText: { fontSize: 12, color: CARD_COLORS.detailText, marginLeft: 4 },
  descriptionText: {
    fontSize: 13,
    color: CARD_COLORS.descriptionText,
    marginTop: 8,
    lineHeight: 18,
  },
});
