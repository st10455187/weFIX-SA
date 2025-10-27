import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen({ navigation, route }) {
  // receive userRole from navigation params
  const { userRole } = route.params || { userRole: 'citizen' };

  // Details based on role
  const user =
    userRole === 'admin'
      ? {
          title: 'Personal Details',
          firstName: 'Admin',
          lastName: 'User',
          position: 'Municipality Staff',
          phone: '011 456 7890',
          email: 'admin@wefixsa.gov.za',
          profile: 'https://randomuser.me/api/portraits/men/12.jpg',
        }
      : {
          title: 'Personal Details',
          firstName: 'James',
          lastName: 'Lebron',
          phone: '067 589 2563',
          email: 'jameslb145@gmail.com',
          profile: 'https://randomuser.me/api/portraits/men/11.jpg',
        };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes, Log Out',
        style: 'destructive',
        onPress: () => navigation.replace('Login'),
      },
    ]);
  };

  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>{user.title}</Text>

      {/* Details */}
      <View style={styles.section}>
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {user.firstName} {user.lastName}
          </Text>
        </View>

        {user.position && (
          <>
            <Text style={styles.label}>Position</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{user.position}</Text>
            </View>
          </>
        )}

        <Text style={styles.label}>Phone</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>

        <Text style={styles.label}>Email Address</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E3E1',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000',
  },
  section: {
    marginTop: 10,
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginBottom: 6,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 1,
  },
  infoText: {
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 15,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
