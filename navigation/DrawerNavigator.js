import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={BottomTabs} />
    </Drawer.Navigator>
  );
}