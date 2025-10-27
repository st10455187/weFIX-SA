import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Welcome'), 2000); // show splash for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* 🖼️ Custom splash image */}
      <Image
        source={require('../assets/splashImage.png')} // make sure this image exists in your assets folder
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // your theme color
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180, // adjust for your design
    height: 180,
  },
});
