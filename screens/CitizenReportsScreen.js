import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MUNICIPALITY_DATA = {
  categories: [
    'Water and Sanitation',
    'Electricity',
    'Roads and Transport',
    'Waste Management',
    'Health',
    'Education',
    'Public Safety',
    'Other'
  ],
  municipalities: [
    'City of Cape Town',
    'eThekwini Metropolitan',
    'City of Johannesburg',
    'City of Tshwane',
    'Nelson Mandela Bay',
    'Buffalo City',
    'Mangaung Metropolitan',
    'Other'
  ]
};

export default function CitizenReportsScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [location, setLocation] = useState('');

  const submitReport = async () => {
    if (!title || !description || !category || !municipality || !location) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('user');
      if (!userData) {
        Alert.alert('Error', 'Please login again');
        return;
      }

      const user = JSON.parse(userData);
      const allReports = await AsyncStorage.getItem('reports');
      const reports = allReports ? JSON.parse(allReports) : [];

      const newReport = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        category,
        municipality,
        location: location.trim(),
        status: 'submitted',
        date: new Date().toISOString(),
        submittedBy: user.username,
        adminNote: '',
        updatedAt: new Date().toISOString(),
      };

      const updatedReports = [...reports, newReport];
      await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));

      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setMunicipality('');
      setLocation('');

      Alert.alert('Success', 'Report submitted successfully!', [
        { 
          text: 'OK', 
          onPress: () => navigation.navigate('CitizenHome')
        }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit report');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Submit a Report</Text>
      <Text style={styles.subheader}>Report municipal issues and service requests</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Report Title *"
        value={title}
        onChangeText={setTitle}
      />
      
      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Please provide detailed description of the issue..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <Text style={styles.label}>Category *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={setCategory}
        >
          <Picker.Item label="Select a category" value="" />
          {MUNICIPALITY_DATA.categories.map(cat => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Municipality *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={municipality}
          style={styles.picker}
          onValueChange={setMunicipality}
        >
          <Picker.Item label="Select municipality" value="" />
          {MUNICIPALITY_DATA.municipalities.map(mun => (
            <Picker.Item key={mun} label={mun} value={mun} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Specific Location/Address *"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity 
        style={[
          styles.submitButton, 
          (!title || !description || !category || !municipality || !location) && styles.submitButtonDisabled
        ]} 
        onPress={submitReport}
        disabled={!title || !description || !category || !municipality || !location}
      >
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>

      <View style={styles.requiredNote}>
        <Text style={styles.requiredText}>* Required fields</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1C1C1E',
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1C1C1E',
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    backgroundColor: 'white',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  requiredNote: {
    alignItems: 'center',
    marginBottom: 30,
  },
  requiredText: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
});