import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Context
import { ReportProvider } from './context/ReportContext';

// Screens
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import MainUserHomeScreen from './screens/MainUserHomeScreen';
import CitizenHomeScreen from './screens/CitizenHomeScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';
import ReportsScreen from './screens/ReportsScreen';
import VolunteerScreen from './screens/VolunteerScreen';
import AccountScreen from './screens/AccountScreen';
import UtilityOutageScreen from './screens/UtilityOutageScreen';
import WasteScheduleScreen from './screens/WasteScheduleScreen';

// Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// ------------------------------------------
// 🔹 Bottom Tabs
// ------------------------------------------
const BottomTabNavigator = ({ userRole }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'Reports')
          iconName = focused ? 'document-text' : 'document-text-outline';
        else if (route.name === 'Volunteer')
          iconName = focused ? 'people' : 'people-outline';
        else if (route.name === 'Account')
          iconName = focused ? 'person' : 'person-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: '#999',
    })}
  >
    {userRole === 'citizen' ? (
      <>
        <Tab.Screen name="Home" component={MainUserHomeScreen} />
        <Tab.Screen name="Reports" component={ReportsScreen} />
        <Tab.Screen name="Volunteer" component={VolunteerScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </>
    ) : (
      <>
        <Tab.Screen name="Home" component={AdminHomeScreen} />
        <Tab.Screen name="Reports" component={ReportsScreen} />
        <Tab.Screen name="Volunteer" component={VolunteerScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </>
    )}
  </Tab.Navigator>
);

// ------------------------------------------
// 🔹 Drawer Navigation
// ------------------------------------------
const DrawerNavigator = ({ userRole }) => (
  <Drawer.Navigator
    screenOptions={({ navigation }) => ({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ marginLeft: 15 }}
        >
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AccountDrawer')}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="person-circle-outline" size={30} color="#000" />
        </TouchableOpacity>
      ),
    })}
  >
    <Drawer.Screen name="MainTabs" options={{ title: 'Home' }}>
      {(props) => <BottomTabNavigator {...props} userRole={userRole} />}
    </Drawer.Screen>
    <Drawer.Screen
  name="ReportsDrawer"
  options={{ title: 'Reports' }}
>
  {(props) => <ReportsScreen {...props} userRole={userRole} />}
</Drawer.Screen>

    <Drawer.Screen
      name="VolunteerDrawer"
      component={VolunteerScreen}
      options={{ title: 'Volunteer' }}
    />
    <Drawer.Screen
      name="AccountDrawer"
      component={AccountScreen}
      options={{ title: 'Account' }}
    />
  </Drawer.Navigator>
);

// ------------------------------------------
// 🔹 Root App Component
// ------------------------------------------
export default function App() {
  const [userRole, setUserRole] = React.useState('citizen'); // or admin

  return (
    <ReportProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />

          {/* Pass setUserRole to LoginScreen */}
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setUserRole={setUserRole} />}
          </Stack.Screen>

          <Stack.Screen
            name="CitizenHomeScreen"
            component={CitizenHomeScreen}
          />

          <Stack.Screen name="Main">
            {(props) => <DrawerNavigator {...props} userRole={userRole} />}
          </Stack.Screen>

          <Stack.Screen
            name="UtilityOutageScreen"
            component={UtilityOutageScreen}
          />
          <Stack.Screen
            name="WasteScheduleScreen"
            component={WasteScheduleScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReportProvider>
  );
}
