import { isContainerGrid, listNotesAtom } from "@/atoms/atom";
import CustomModal from "@/components/custom-modal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function LisView() {
  const [allNotes, setAllNotes] = useAtom(listNotesAtom);
  const [isGrid, setIsGrid] = useAtom(isContainerGrid);
  const [selectedId, setSelectedId] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    setAllNotes(allNotes.filter((prev) => prev.id !== selectedId));
    setModalVisible(false);
  };

  return (
    <View className="flex-1 pt-3 px-1">
      <FlatList
        key={isGrid ? "grid" : "list"}
        data={allNotes}
        numColumns={isGrid ? 2 : 1}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            className={`
        bg-gray-200 flex-1 flex-row justify-between  p-3 border-b border-gray-300  ${isGrid ? "m-1 rounded-xl" : ""}
      `}
            style={
              isGrid
                ? { flexBasis: "48%", maxWidth: "48%", minHeight: 90 }
                : { flex: 1 }
            }
          >
            <TouchableOpacity
              className="flex-1"
              onPress={() => router.push(`/${item.id}/view-details`)}
            >
              <Text className="text-xl" numberOfLines={2}>
                {item.title}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedId(item.id);
                setModalVisible(true);
              }}
              z-10
              className={isGrid ? "absolute top-2 right-2 z-10" : ""}
            >
              <MaterialIcons name="delete-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={() => {
          // delete logic here
          handleDelete();
        }}
      />
    </View>
  );
}
