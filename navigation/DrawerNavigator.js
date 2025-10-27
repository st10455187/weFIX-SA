import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import ReportsScreen from '../screens/ReportsScreen';
import VolunteerScreen from '../screens/VolunteerScreen';
import AccountScreen from '../screens/AccountScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ userRole }) {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      {/* ✅ Pass userRole to BottomTabNavigator */}
      <Drawer.Screen name="Home">
        {(props) => <BottomTabNavigator {...props} userRole={userRole} />}
      </Drawer.Screen>

      {/* ✅ Pass userRole to ReportsScreen so admins can edit */}
      <Drawer.Screen name="Reports">
        {(props) => <ReportsScreen {...props} userRole={userRole} />}
      </Drawer.Screen>

      <Drawer.Screen name="Volunteer" component={VolunteerScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
    </Drawer.Navigator>
  );
}
