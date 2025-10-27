import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation, setUserRole }) {
  const [selectedRole, setSelectedRole] = useState('Citizen');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setError('');

    // Validation logic
    if (selectedRole === 'Citizen') {
      if (username === 'user' && password === 'user123') {
        setUserRole('citizen');
        Alert.alert('Login Successful', 'Welcome Citizen 👋');
        navigation.replace('Main');
      } else {
        setError('Invalid username or password for Citizen');
      }
    } else if (selectedRole === 'Admin') {
      if (username === 'admin' && password === 'admin123') {
        setUserRole('admin');
        Alert.alert('Login Successful', 'Welcome Admin 👋');
        navigation.replace('Main');
      } else {
        setError('Invalid username or password for Admin');
      }
    }
  };

  const comingFeature = () => {
    Alert.alert(
      'Coming Soon 🚀',
      'We’re working hard to bring this feature to you soon!'
    );
  };

  return (
    <View style={styles.container}>
      {/* Back arrow */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 24 }}>←</Text>
      </TouchableOpacity>

      <Text style={styles.welcomeText}>
        Welcome to weFix SA, it’s great to see you!
      </Text>

      {/* Role Selector */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === 'Citizen' && styles.roleSelected,
          ]}
          onPress={() => setSelectedRole('Citizen')}>
          <Text
            style={[
              styles.roleText,
              selectedRole === 'Citizen' && styles.roleTextSelected,
            ]}>
            Citizen
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === 'Admin' && styles.roleSelected,
          ]}
          onPress={() => setSelectedRole('Admin')}>
          <Text
            style={[
              styles.roleText,
              selectedRole === 'Admin' && styles.roleTextSelected,
            ]}>
            Admin
          </Text>
        </TouchableOpacity>
      </View>

      {/* Username */}
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input with Eye Icon */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color="#555"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity
        style={{ alignSelf: 'flex-end' }}
        onPress={comingFeature}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or Login with</Text>
        <View style={styles.line} />
      </View>

      {/* Social Buttons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={comingFeature}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Google_2015_logo.svg',
            }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={comingFeature}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
            }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Register */}
      <Text style={styles.footerText}>
        Don’t have an account?{' '}
        <Text style={styles.registerText} onPress={comingFeature}>
          Register Now
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E4E2',
    padding: 25,
  },
  backButton: {
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 25,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F3F2F1',
    borderRadius: 12,
    padding: 5,
    marginBottom: 15,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  roleSelected: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  roleText: {
    color: '#555',
    fontWeight: '600',
  },
  roleTextSelected: {
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  forgotText: {
    color: '#555',
    marginBottom: 25,
  },
  loginButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#C7C7C7',
  },
  orText: {
    marginHorizontal: 10,
    color: '#777',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 25,
    color: '#555',
  },
  registerText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
