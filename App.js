import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import CitizenHomeScreen from './screens/CitizenHomeScreen';
import CitizenReportsScreen from './screens/CitizenReportsScreen';
import CitizenReportDetailScreen from './screens/CitizenReportDetailScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';
import AdminReportsScreen from './screens/AdminReportsScreen';
import AdminReportDetailScreen from './screens/AdminReportDetailScreen';
import AccountScreen from './screens/AccountScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        
        {/* Citizen Flow */}
        <Stack.Screen 
          name="CitizenHome" 
          component={CitizenHomeScreen}
          options={{ 
            title: 'My Reports', 
            headerBackVisible: false,
            headerStyle: { backgroundColor: '#007AFF' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen 
          name="CitizenReports" 
          component={CitizenReportsScreen}
          options={{ 
            title: 'Submit Report',
            headerStyle: { backgroundColor: '#007AFF' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen 
          name="CitizenReportDetail" 
          component={CitizenReportDetailScreen}
          options={{ 
            title: 'Report Details',
            headerStyle: { backgroundColor: '#007AFF' },
            headerTintColor: 'white',
          }}
        />
        
        {/* Admin Flow */}
        <Stack.Screen 
          name="AdminHome" 
          component={AdminHomeScreen}
          options={{ 
            title: 'Admin Dashboard', 
            headerBackVisible: false,
            headerStyle: { backgroundColor: '#007AFF' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen 
          name="AdminReports" 
          component={AdminReportsScreen}
          options={{ 
            title: 'All Reports',
            headerStyle: { backgroundColor: '#007AFF' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen 
          name="AdminReportDetail" 
          component={AdminReportDetailScreen}
          options={{ 
            title: 'Report Details',
            headerStyle: { backgroundColor: '#007AFF' },
            headerTintColor: 'white',
          }}
        />
        
        {/* Common Screens */}
        <Stack.Screen 
          name="Account" 
          component={AccountScreen}
          options={{ 
            title: 'My Account',
            headerStyle: { backgroundColor: '#007AFF' },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}