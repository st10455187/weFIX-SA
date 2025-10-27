import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CitizenTabs from './CitizenTabs';
import CitizenReportDetailScreen from '../screens/CitizenReportDetailScreen';

const Stack = createNativeStackNavigator();

export default function CitizenNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CitizenTabs" 
        component={CitizenTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CitizenReportDetail" 
        component={CitizenReportDetailScreen}
        options={{ title: 'Report Details' }}
      />
    </Stack.Navigator>
  );
}