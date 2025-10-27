import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Always go to LoginScreen after splash
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WeFixSA</Text>
      <Text style={styles.subtitle}>Municipality Service App</Text>
      <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 40,
  },
  loader: {
    marginBottom: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
  },
});