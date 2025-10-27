import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VolunteerCard from '../components/VolunteerCard';
import volunteerData from '../data/volunteerData.json';

const COLORS = {
  background: '#E8E3E1',
  primaryText: '#000',
  secondaryText: '#4C4C4C',
  searchBackground: '#fff',
};

export default function VolunteerScreen({ navigation }) {
  const [query, setQuery] = useState('');

  // Safe search with fallback values
  const filtered = volunteerData.filter((v) => {
    const city = v.city?.toLowerCase() || '';
    const title = v.title?.toLowerCase() || '';
    const province = v.province?.toLowerCase() || '';
    const q = query.toLowerCase();
    return city.includes(q) || title.includes(q) || province.includes(q);
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>


        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={20}
              color={COLORS.secondaryText}
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Search opportunities"
              placeholderTextColor={COLORS.secondaryText}
              value={query}
              onChangeText={setQuery}
              style={styles.searchInput}
            />
          </View>

          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.sectionTitle}>Volunteering Opportunities</Text>

        {/* Volunteer List */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <VolunteerCard item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>No opportunities found.</Text>
          }
        />
      </View>

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

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.searchBackground,
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.primaryText,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: COLORS.searchBackground,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primaryText,
    marginBottom: 10,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    color: COLORS.secondaryText,
  },
});
