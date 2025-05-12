import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import AddStudentScreen from '../screens/AddStudentScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Hide the header for all screens
          tabBarIcon: ({ color, size }) => {
            let iconName: string;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Add Student') iconName = 'person-add';
            else iconName = 'settings';
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.button,
          tabBarInactiveTintColor: colors.secondaryText,
          tabBarStyle: { backgroundColor: colors.cardBackground },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add Student" component={AddStudentScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;