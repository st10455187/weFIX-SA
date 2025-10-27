import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  // User management
  async saveUser(user) {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  },

  async getUser() {
    try {
      const user = await AsyncStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  async logout() {
    try {
      await AsyncStorage.removeItem('user');
      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      return false;
    }
  },

  // Citizen users management
  async saveCitizen(citizen) {
    try {
      const citizens = await this.getCitizens();
      const updatedCitizens = [...citizens, citizen];
      await AsyncStorage.setItem('citizens', JSON.stringify(updatedCitizens));
      return true;
    } catch (error) {
      console.error('Error saving citizen:', error);
      return false;
    }
  },

  async getCitizens() {
    try {
      const citizens = await AsyncStorage.getItem('citizens');
      return citizens ? JSON.parse(citizens) : [];
    } catch (error) {
      console.error('Error getting citizens:', error);
      return [];
    }
  },

  async updateCitizen(username, updates) {
    try {
      const citizens = await this.getCitizens();
      const updatedCitizens = citizens.map(citizen =>
        citizen.username === username ? { ...citizen, ...updates } : citizen
      );
      await AsyncStorage.setItem('citizens', JSON.stringify(updatedCitizens));
      return true;
    } catch (error) {
      console.error('Error updating citizen:', error);
      return false;
    }
  },

  // App initialization
  async initializeAppData() {
    try {
      // Initialize reports if they don't exist
      const reports = await AsyncStorage.getItem('reports');
      if (!reports) {
        await AsyncStorage.setItem('reports', JSON.stringify([]));
      }

      // Initialize citizens if they don't exist
      const citizens = await AsyncStorage.getItem('citizens');
      if (!citizens) {
        await AsyncStorage.setItem('citizens', JSON.stringify([]));
      }

      return true;
    } catch (error) {
      console.error('Error initializing app data:', error);
      return false;
    }
  },

  // Clear all data (for development)
  async clearAllData() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
};