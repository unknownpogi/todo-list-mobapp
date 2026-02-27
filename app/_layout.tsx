import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "../global.css";

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#000"); // bottom bar color
    NavigationBar.setButtonStyleAsync("light"); // button color
  }, []);
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="light" backgroundColor="#ffffff" />
    </>
  );
}
