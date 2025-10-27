import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  Image,
  Modal,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import municipalities from '../data/municipalityData.json';
import { ReportContext } from '../context/ReportContext';

const COLORS = {
  background: '#E8E3E1',
  inputBackground: '#ffffff',
  primaryText: '#000000',
  secondaryText: '#4c4c4c',
  button: '#000000',
};

export default function CitizenHomeScreen({ navigation }) {
  const { reports, addReport } = useContext(ReportContext); // ✅ shared context

  const [reportType, setReportType] = useState('Streetlights');
  const [description, setDescription] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [city, setCity] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const issueTypes = [
    'Streetlights',
    'Potholes',
    'Garbage Collection',
    'Water Leakage',
    'Sewage Problems',
    'Illegal Dumping',
    'Road Damage',
    'Noise Pollution',
    'Broken Traffic Lights',
    'Other',
  ];

  // --- Auto update municipality when city changes ---
  useEffect(() => {
    const found = municipalities.find(
      (item) => item.city.toLowerCase() === city.toLowerCase()
    );
    setMunicipality(found ? found.municipality : '');
  }, [city]);

  // --- Pick image ---
  const pickImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      Alert.alert('Permission required', 'Please allow gallery access.');
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!res.canceled) setImageUri(res.assets[0].uri);
  };

  // --- Take photo ---
  const takePhoto = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (!result.granted) {
      Alert.alert('Permission required', 'Please allow camera access.');
      return;
    }

    const res = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  };

  // --- Fetch current location ---
  const fetchCurrentLocation = async () => {
    try {
      setLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Please enable location services.');
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address) {
        setStreetName(address.street || '');
        setStreetNumber(address.streetNumber || '');
        setCity(address.city || '');
      }

      setLoadingLocation(false);
      Alert.alert('Success', 'Your current location has been added.');
    } catch (err) {
      console.log(err);
      setLoadingLocation(false);
      Alert.alert('Error', 'Could not fetch your location.');
    }
  };

  // --- Submit Report ---
  const handleSubmit = () => {
    if (!description || !city) {
      Alert.alert('Missing Info', 'Please fill all required fields.');
      return;
    }

    const newReport = {
      id: Date.now().toString(),
      category: reportType,
      description,
      address: `${streetNumber} ${streetName}`,
      municipality,
      city,
      imageUrl: imageUri,
      status: 'In Progress',
      createdAt: new Date().toISOString(),
    };

    addReport(newReport); // ✅ Add to shared context
    Alert.alert('Report Submitted ✅', 'Your report has been added.');

    // Reset form
    setDescription('');
    setStreetName('');
    setStreetNumber('');
    setCity('');
    setMunicipality('');
    setImageUri(null);
  };

  // --- Report Card ---
  const ReportCard = ({ report }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image
          source={{
            uri:
              report.imageUrl ||
              'https://via.placeholder.com/100x100?text=Report',
          }}
          style={styles.cardImage}
        />
        <View style={{ flex: 1 }}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{report.category}</Text>
            <Text
              style={[
                styles.cardStatus,
                {
                  color:
                    report.status === 'Resolved'
                      ? '#4AC87F'
                      : report.status === 'In Progress'
                      ? '#55C2E7'
                      : '#FF4A7F',
                },
              ]}
            >
              {report.status}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={14} color="#555" />
            <Text style={styles.detailText}>{report.address}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="business-outline" size={14} color="#555" />
            <Text style={styles.detailText}>{report.municipality}</Text>
          </View>

          <Text style={styles.cardDescription} numberOfLines={2}>
            {report.description}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <Text style={styles.hiText}>Hi</Text>
        <Text style={styles.nameText}>James</Text>

        {/* Form */}
        <Text style={styles.formTitle}>Create a report</Text>

        {/* Dropdown */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setDropdownVisible(true)}
        >
          <Text style={styles.dropdownText}>{reportType}</Text>
          <Ionicons name="chevron-down" size={20} color={COLORS.primaryText} />
        </TouchableOpacity>

        {/* Dropdown Modal */}
        <Modal
          visible={isDropdownVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setDropdownVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setDropdownVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Issue Type</Text>
              {issueTypes.map((type, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.modalOption,
                    reportType === type && { backgroundColor: '#E5E5E5' },
                  ]}
                  onPress={() => {
                    setReportType(type);
                    setDropdownVisible(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Description */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the issue..."
          placeholderTextColor="#999"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Image Picker */}
        <View style={styles.imageSection}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          ) : (
            <View style={styles.previewPlaceholder}>
              <Ionicons name="image-outline" size={40} color="#888" />
              <Text style={{ color: '#888' }}>No image selected</Text>
            </View>
          )}

          <View style={styles.imageButtons}>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Ionicons name="images-outline" size={20} color="#000" />
              <Text style={styles.imageButtonText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
              <Ionicons name="camera-outline" size={20} color="#000" />
              <Text style={styles.imageButtonText}>Camera</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Location */}
        <TouchableOpacity
          style={styles.locationButton}
          onPress={fetchCurrentLocation}
        >
          <Ionicons name="location-outline" size={20} color="#fff" />
          <Text style={styles.locationText}>
            {loadingLocation ? 'Fetching Location...' : 'Use Current Location'}
          </Text>
        </TouchableOpacity>

        {/* Address Fields */}
        <TextInput
          style={styles.input}
          placeholder="Street Name"
          placeholderTextColor="#999"
          value={streetName}
          onChangeText={setStreetName}
        />
        <TextInput
          style={styles.input}
          placeholder="Street Number"
          placeholderTextColor="#999"
          value={streetNumber}
          onChangeText={setStreetNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="#999"
          value={city}
          onChangeText={setCity}
        />

        {/* Municipality */}
        {municipality ? (
          <View style={styles.municipalityBox}>
            <Ionicons name="business-outline" size={16} color="#000" />
            <Text style={styles.municipalityText}>{municipality}</Text>
          </View>
        ) : null}

        {/* Submit */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit report</Text>
        </TouchableOpacity>

        {/* Reports List */}
        <Text style={[styles.formTitle, { marginTop: 30 }]}>Your Reports</Text>
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ReportCard report={item} />}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  hiText: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primaryText,
  },
  nameText: {
    fontSize: 22,
    color: COLORS.secondaryText,
    marginBottom: 30,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primaryText,
    marginBottom: 15,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdownText: { fontSize: 16, color: COLORS.primaryText },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 55,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  textArea: { minHeight: 100, textAlignVertical: 'top', paddingTop: 15 },
  imageSection: { marginBottom: 20 },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  previewPlaceholder: {
    height: 180,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  imageButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '48%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imageButtonText: { marginLeft: 8, fontWeight: '600' },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 14,
    justifyContent: 'center',
    marginBottom: 15,
  },
  locationText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 8,
    fontWeight: '600',
  },
  municipalityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  municipalityText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: COLORS.button,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: { flexDirection: 'row' },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#000' },
  cardStatus: { fontSize: 13, fontWeight: '600' },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  detailText: { fontSize: 12, color: '#555', marginLeft: 4 },
  cardDescription: { fontSize: 13, color: '#777', marginTop: 5 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: { fontWeight: '700', fontSize: 18, marginBottom: 10 },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  modalOptionText: { fontSize: 16, color: '#000' },
});
