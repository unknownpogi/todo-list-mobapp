import { isContainerGrid } from "@/atoms/atom";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { useAtom } from "jotai";
import { Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  // const [isGrid, setIsGrid] = useState(false);
  const [isGrid, setIsGrid] = useAtom(isContainerGrid);

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          header: () => {
            return (
              <View className="flex flex-row pt-safe justify-between items-center px-6 border-b border-gray-300">
                <Text className="text-4xl mt-3 mb-2">Tasks</Text>
                <TouchableOpacity
                  className="flex flex-row"
                  onPress={() => setIsGrid((prev) => !prev)}
                >
                  {isGrid ? (
                    <MaterialIcons
                      name="format-list-bulleted"
                      size={30}
                      color="black"
                    />
                  ) : (
                    <MaterialIcons name="grid-view" size={24} color="black" />
                  )}
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
          headerShown: false,
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
