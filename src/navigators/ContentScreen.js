import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ReservationScreen from '../screens/ReservationScreen';

const Tab = createBottomTabNavigator()

export default function ContentScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name='History' component={HistoryScreen} options={{ headerShown: false }} />
      <Tab.Screen name='Reservation' component={ReservationScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}