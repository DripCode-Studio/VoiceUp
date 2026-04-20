import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { AllPetitionsScreen } from "../screens/main/AllPetitionsScreen";
import { CreatePetitionScreen } from "../screens/main/CreatePetitionScreen";
import { HomeScreen } from "../screens/main/HomeScreen";
import { PetitionDetailsScreen } from "../screens/main/PetitionDetailsScreen";
import { ProfileScreen } from "../screens/main/ProfileScreen";

import { COLORS } from "../utils/constants";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.05,
          shadowRadius: 20,
          height: 88,
          paddingTop: 10,
          paddingBottom: 14,
          backgroundColor: "transparent",
        },
        tabBarBackground: () => (
          <View style={styles.blurContainer}>
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: "rgba(255,255,255,0.95)" },
              ]}
            />
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconContainer,
              ]}
            >
              <MaterialIcons
                name="home"
                size={24}
                color={focused ? COLORS.primaryContainer : "#94a3b8"}
              />
              <Text
                style={[
                  styles.iconLabel,
                  focused ? styles.activeIconLabel : styles.inactiveIconLabel,
                ]}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CreateTab"
        component={CreatePetitionScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconContainer,
              ]}
            >
              <MaterialIcons
                name="add-circle"
                size={24}
                color={focused ? COLORS.primaryContainer : "#94a3b8"}
              />
              <Text
                style={[
                  styles.iconLabel,
                  focused ? styles.activeIconLabel : styles.inactiveIconLabel,
                ]}
              >
                Create
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconContainer,
              ]}
            >
              <MaterialIcons
                name="person"
                size={24}
                color={focused ? COLORS.primaryContainer : "#94a3b8"}
              />
              <Text
                style={[
                  styles.iconLabel,
                  focused ? styles.activeIconLabel : styles.inactiveIconLabel,
                ]}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="AllPetitions" component={AllPetitionsScreen} />
      <Stack.Screen name="PetitionDetails" component={PetitionDetailsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderRadius: 16,
    width: 88,
    height: 56,
    marginTop: 4,
  },
  activeIconContainer: {
    backgroundColor: "#eff6ff",
  },
  iconLabel: {
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 14,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  activeIconLabel: {
    color: COLORS.primaryContainer,
  },
  inactiveIconLabel: {
    color: "#94a3b8",
  },
});
