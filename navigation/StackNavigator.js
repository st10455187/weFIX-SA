import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import AdminNavigator from './AdminNavigator';
import CitizenNavigator from './CitizenNavigator';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AdminNavigator" 
        component={AdminNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CitizenNavigator" 
        component={CitizenNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}