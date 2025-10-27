import AsyncStorage from '@react-native-async-storage/async-storage';

export const reportStorage = {
  // Get all reports
  async getAllReports() {
    try {
      const reports = await AsyncStorage.getItem('reports');
      return reports ? JSON.parse(reports) : [];
    } catch (error) {
      console.error('Error getting reports:', error);
      return [];
    }
  },

  // Save a new report
  async saveReport(report) {
    try {
      const reports = await this.getAllReports();
      const updatedReports = [...reports, report];
      await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));
      return true;
    } catch (error) {
      console.error('Error saving report:', error);
      return false;
    }
  },

  // Update a report
  async updateReport(reportId, updates) {
    try {
      const reports = await this.getAllReports();
      const updatedReports = reports.map(report =>
        report.id === reportId ? { ...report, ...updates } : report
      );
      await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));
      return true;
    } catch (error) {
      console.error('Error updating report:', error);
      return false;
    }
  },

  // Get reports by user
  async getReportsByUser(username) {
    try {
      const reports = await this.getAllReports();
      return reports.filter(report => report.submittedBy === username);
    } catch (error) {
      console.error('Error getting user reports:', error);
      return [];
    }
  },

  // Get report by ID
  async getReportById(reportId) {
    try {
      const reports = await this.getAllReports();
      return reports.find(report => report.id === reportId);
    } catch (error) {
      console.error('Error getting report:', error);
      return null;
    }
  },

  // Delete a report
  async deleteReport(reportId) {
    try {
      const reports = await this.getAllReports();
      const updatedReports = reports.filter(report => report.id !== reportId);
      await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));
      return true;
    } catch (error) {
      console.error('Error deleting report:', error);
      return false;
    }
  },

  // Get reports by status
  async getReportsByStatus(status) {
    try {
      const reports = await this.getAllReports();
      return reports.filter(report => report.status === status);
    } catch (error) {
      console.error('Error getting reports by status:', error);
      return [];
    }
  },

  // Search reports
  async searchReports(query) {
    try {
      const reports = await this.getAllReports();
      const lowerQuery = query.toLowerCase();
      return reports.filter(report =>
        report.title.toLowerCase().includes(lowerQuery) ||
        report.description.toLowerCase().includes(lowerQuery) ||
        report.category.toLowerCase().includes(lowerQuery) ||
        report.location.toLowerCase().includes(lowerQuery) ||
        report.submittedBy.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('Error searching reports:', error);
      return [];
    }
  }
};