import { listNotesAtom } from "@/atoms/atom";
import CustomModal from "@/components/custom-modal";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ViewDetails() {
  const { id } = useLocalSearchParams();
  const [allNotes, setAllNotes] = useAtom(listNotesAtom);
  const numericId = id ? Number(id) : undefined;
  const notess = allNotes.find((note) => note.id === numericId);
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRouter();

  const handleDelete = () => {
    setAllNotes(allNotes.filter((prev) => prev.id !== numericId));
    setModalVisible(false);
    route.replace("/");
  };

  return (
    <View className="flex-1 p-5 gap-3 pb-safe">
      <View>
        <Text className="text-5xl">{notess?.title}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-gray-500">{notess?.notes}</Text>
      </View>
      <View>
        <TouchableOpacity
          className="justify-center items-center"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-red-500 font-medium text-lg">Delete Task</Text>
        </TouchableOpacity>
      </View>

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
