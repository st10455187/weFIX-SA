import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('citizen');

  const handleAuth = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (isLogin) {
      // Login logic
      if (userType === 'admin') {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
          await AsyncStorage.setItem('user', JSON.stringify({
            type: 'admin',
            username: username,
            name: 'Administrator',
            email: 'admin@municipality.gov.za',
            phone: ''
          }));
          navigation.replace('AdminHome');
        } else {
          Alert.alert('Error', 'Invalid admin credentials');
        }
      } else {
        // Citizen login - check if user exists
        try {
          const users = await AsyncStorage.getItem('citizens');
          const citizens = users ? JSON.parse(users) : [];
          const user = citizens.find(u => u.username === username && u.password === password);
          
          if (user) {
            await AsyncStorage.setItem('user', JSON.stringify(user));
            navigation.replace('CitizenHome');
          } else {
            Alert.alert('Error', 'Invalid credentials or user not found');
          }
        } catch (error) {
          Alert.alert('Error', 'Something went wrong');
        }
      }
    } else {
      // Signup logic for citizens only
      if (userType === 'admin') {
        Alert.alert('Error', 'Admin accounts cannot be created');
        return;
      }

      try {
        const users = await AsyncStorage.getItem('citizens');
        const citizens = users ? JSON.parse(users) : [];
        
        // Check if username exists
        if (citizens.find(u => u.username === username)) {
          Alert.alert('Error', 'Username already exists');
          return;
        }

        const newUser = {
          type: 'citizen',
          username,
          password,
          name: '',
          email: '',
          phone: ''
        };

        citizens.push(newUser);
        await AsyncStorage.setItem('citizens', JSON.stringify(citizens));
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        
        Alert.alert('Success', 'Account created successfully');
        navigation.replace('CitizenTabs');
      } catch (error) {
        Alert.alert('Error', 'Failed to create account');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WeFixSA</Text>
      <Text style={styles.subtitle}>Municipality Service App</Text>
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isLogin && styles.activeToggle]}
          onPress={() => setIsLogin(true)}
        >
          <Text style={[styles.toggleText, isLogin && styles.activeToggleText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isLogin && styles.activeToggle]}
          onPress={() => setIsLogin(false)}
        >
          <Text style={[styles.toggleText, !isLogin && styles.activeToggleText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.userTypeContainer}>
        <TouchableOpacity
          style={[styles.userTypeButton, userType === 'citizen' && styles.activeUserType]}
          onPress={() => setUserType('citizen')}
        >
          <Text style={userType === 'citizen' ? styles.activeUserTypeText : styles.userTypeText}>Citizen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.userTypeButton, userType === 'admin' && styles.activeUserType]}
          onPress={() => setUserType('admin')}
        >
          <Text style={userType === 'admin' ? styles.activeUserTypeText : styles.userTypeText}>Admin</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.demoText}>
        Demo Admin: admin / admin123
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#007AFF',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    padding: 5,
  },
  toggleButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: '#007AFF',
  },
  toggleText: {
    fontSize: 16,
    color: '#666',
  },
  activeToggleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  userTypeButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    marginHorizontal: 5,
    borderRadius: 8,
  },
  activeUserType: {
    backgroundColor: '#007AFF',
  },
  userTypeText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  activeUserTypeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontStyle: 'italic',
  },
});