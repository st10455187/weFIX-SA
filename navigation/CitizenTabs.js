import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CitizenHomeScreen from '../screens/CitizenHomeScreen';
import CitizenReportsScreen from '../screens/CitizenReportsScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

export default function CitizenTabs() {
  return (
    <Tab.Navigator
      initialRouteName="CitizenHome" // This sets the default tab
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'CitizenHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'CitizenReports') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="CitizenHome" 
        component={CitizenHomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="CitizenReports" 
        component={CitizenReportsScreen}
        options={{ title: 'Submit Report' }}
      />
      <Tab.Screen 
        name="Account" 
        component={AccountScreen}
        options={{ title: 'Account' }}
      />
    </Tab.Navigator>
  );
}