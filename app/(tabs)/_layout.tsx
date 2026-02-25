import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          header: () => {
            return (
              <View className="flex flex-row pt-safe justify-between px-6">
                <Text className="text-3xl">Tasks</Text>
                <TouchableOpacity className="flex flex-row">
                  <MaterialIcons name="grid-view" size={24} color="black" />
                </TouchableOpacity>
              </View>
            );
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
