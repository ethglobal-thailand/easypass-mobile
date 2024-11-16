import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import ScanSVG from "@/assets/svg/scan";
import { clsx } from "clsx";
import MapSVG from "@/assets/svg/map";
import UserSVG from "@/assets/svg/user";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        sceneStyle: {
          backgroundColor: "#1A1A1A",
        },
        headerShown: false,

        tabBarVariant: "uikit",

        tabBarStyle: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#1A1A1A",
          borderColor: "tranparent",
          borderTopWidth: 0,
        },

        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Map",
          tabBarIcon: ({ focused }) => (
            <View
              className={clsx(
                focused ? "bg-primary" : "bg-white",
                "p-3 rounded-full"
              )}
            >
              <MapSVG color={focused ? "white" : "black"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ focused }) => (
            <View
              className={clsx(
                focused ? "bg-primary" : "bg-white",
                "p-3 rounded-full"
              )}
            >
              <ScanSVG color={focused ? "white" : "black"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View
              className={clsx(
                focused ? "bg-primary" : "bg-white",
                "p-3 rounded-full"
              )}
            >
              <UserSVG color={focused ? "white" : "black"} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
