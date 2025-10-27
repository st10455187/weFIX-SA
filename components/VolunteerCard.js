import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function VolunteerCard({ item }) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.row}>
        <Image
          source={{ uri: item.image || 'https://via.placeholder.com/100x100' }}
          style={styles.image}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.location}>{item.city}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  row: { flexDirection: 'row' },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },
  title: { fontSize: 18, fontWeight: '700', color: '#000' },
  location: { fontSize: 13, color: '#555', marginVertical: 4 },
  description: { fontSize: 13, color: '#777', lineHeight: 18 },
});
