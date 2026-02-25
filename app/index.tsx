import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  // return <Redirect href={"/(tabs)/home"} />;
  const [isGrid, setIsGrid] = useState(false);

  const data = ["1", "2", "3", "4", "5", "6"];

  return (
    <View style={styles.container}>
      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsGrid(!isGrid)}
      >
        <Text style={styles.buttonText}>
          {isGrid ? "Row View" : "Grid View"}
        </Text>
      </TouchableOpacity>

      {/* Container */}
      <View className={`${isGrid ? "flex-row flex-wrap" : "flex-col"}`}>
        {data.map((item, index) => (
          <View
            key={index}
            className={`
              bg-gray-200 p-5 rounded-xl mb-3
              ${isGrid ? "w-[48%] m-[1%]" : "w-full"}
            `}
          >
            <Text className="text-center text-lg">{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  button: {
    backgroundColor: "#137FEC",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
  },

  list: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  // Row layout
  row: {
    flexDirection: "column",
  },

  rowItem: {
    width: "100%",
  },

  // Grid layout
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  gridItem: {
    width: "48%",
    margin: "1%",
  },

  item: {
    backgroundColor: "#eee",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
});
