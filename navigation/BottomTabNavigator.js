import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CitizenHomeScreen from '../screens/CitizenHomeScreen';
import AdminHomeScreen from '../screens/AdminHomeScreen';
import ReportsScreen from '../screens/ReportsScreen';
import VolunteerScreen from '../screens/VolunteerScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ userRole }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: 60,
          borderRadius: 20,
          marginBottom: 10,
          marginHorizontal: 10,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Reports') iconName = 'folder';
          else if (route.name === 'Volunteer') iconName = 'heart';
          else if (route.name === 'Account') iconName = 'person';
          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
    >
      {userRole === 'admin' ? (
        <>
          <Tab.Screen name="Home" component={AdminHomeScreen} />

          {/* ✅ Pass userRole into ReportsScreen */}
          <Tab.Screen name="Reports">
            {(props) => <ReportsScreen {...props} userRole="admin" />}
          </Tab.Screen>

          <Tab.Screen name="Volunteer" component={VolunteerScreen} />

          {/* ✅ Pass userRole into AccountScreen */}
          <Tab.Screen name="Account">
            {(props) => <AccountScreen {...props} userRole="admin" />}
          </Tab.Screen>
        </>
      ) : (
        <>
          <Tab.Screen name="Home" component={CitizenHomeScreen} />

          {/* ✅ Pass userRole into ReportsScreen */}
          <Tab.Screen name="Reports">
            {(props) => <ReportsScreen {...props} userRole="citizen" />}
          </Tab.Screen>

          <Tab.Screen name="Volunteer" component={VolunteerScreen} />

          {/* ✅ Pass userRole into AccountScreen */}
          <Tab.Screen name="Account">
            {(props) => <AccountScreen {...props} userRole="citizen" />}
          </Tab.Screen>
        </>
      )}
    </Tab.Navigator>
  );
}
