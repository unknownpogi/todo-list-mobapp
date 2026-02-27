import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Stack,
  useLocalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function RootLayout() {
  const route = useRouter();
  const { id } = useLocalSearchParams();
  const stringId = Array.isArray(id) ? id[0] : id;
  const pathName = usePathname();

  return (
    <Stack
      screenOptions={{
        header: () => (
          <View className="flex-row justify-between items-center pt-safe border-b border-gray-300 p-4">
            <TouchableOpacity
              className="flex-row item-center"
              onPress={() => route.canGoBack() && route.back()}
            >
              <Ionicons name="chevron-back-outline" size={20} color="blue" />
              <Text className=" text-xl text-blue-600">Back</Text>
            </TouchableOpacity>
            <Text className="text-xl">Details</Text>
            <TouchableOpacity
              className=" px-3 py-1 rounded"
              disabled={pathName.endsWith("/edit") ? true : false}
              onPress={() =>
                route.push({
                  pathname: "/[id]/edit", // keep this exact as your file structure
                  params: { id: stringId }, // pass the dynamic id here
                })
              }
            >
              <Text className="text-xl text-blue-600">
                {pathName.endsWith("/edit") ? "" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>
          // p-4 flex-row justify-between items-center pt-safe border-b border-gray-300
        ),
      }}
    />
  );
}
