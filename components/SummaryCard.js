import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SummaryCard({ title, value, color }) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  title: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
});
