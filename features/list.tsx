import { useHeaderHeight } from "@react-navigation/elements";
import { Text, View } from "react-native";

export default function LisView() {
  const headerHeight = useHeaderHeight();
  return (
    <View className="flex-1 bg-red-500 ">
      <Text>List</Text>
    </View>
  );
}
