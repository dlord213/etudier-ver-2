import { Tabs } from "expo-router";
import { useEffect } from "react";

import Colors from "@/constants/Colors";
import useThemeStore from "@/hooks/useThemeStore";
import useModalSheetStore from "@/hooks/useModalSheetStore";
import useTaskStore from "@/hooks/useTaskStore";
import useNoteStore from "@/hooks/useNoteStore";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Layout() {
  const { palette, isDarkMode, isOLEDMode, hasColorOnNavBar } = useThemeStore();
  const { isModalOpen } = useModalSheetStore();
  const { loadTaskSettings } = useTaskStore();
  const { loadNoteSettings, loadStoredNotes } = useNoteStore();

  const navBarBackgroundColor = hasColorOnNavBar
    ? isDarkMode
      ? isOLEDMode
        ? "#000000"
        : Colors[palette][600]
      : Colors[palette][600]
    : isDarkMode
    ? isOLEDMode
      ? "#000000"
      : Colors.Backgrounds_Dark.Brand
    : Colors.Backgrounds_Light.Brand;

  useEffect(() => {
    loadTaskSettings();
    loadNoteSettings();
    loadStoredNotes();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { display: "none" },
        tabBarStyle: {
          backgroundColor: navBarBackgroundColor,
          display: isModalOpen ? "none" : "flex",
          elevation: 0,
          borderColor: navBarBackgroundColor,
        },
        tabBarActiveTintColor: !hasColorOnNavBar
          ? Colors[palette][500]
          : Colors.Text_Dark.Default,
        tabBarInactiveTintColor: Colors.Text_Dark.Tertiary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tasks" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="focus"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="clock-four" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="hub"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="hub" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="note-sticky" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
