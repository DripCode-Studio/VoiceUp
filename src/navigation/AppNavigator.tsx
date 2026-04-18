import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import { HomeScreen } from '../screens/main/HomeScreen';
import { PetitionDetailsScreen } from '../screens/main/PetitionDetailsScreen';
import { CreatePetitionScreen } from '../screens/main/CreatePetitionScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';

import { COLORS } from '../utils/constants';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          title: 'Petitions',
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="CreateTab" 
        component={CreatePetitionScreen} 
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-circle" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="PetitionDetails" component={PetitionDetailsScreen} />
    </Stack.Navigator>
  );
};
