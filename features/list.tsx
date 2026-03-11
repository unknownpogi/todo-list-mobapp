import { isContainerGrid } from "@/atoms/atom";
import CustomModal from "@/components/custom-modal";
import { useAllTasks, useDeleteTask } from "@/hooks/tasks";
import { Task } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { MotiView } from "moti";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LisView() {
  const [allNotes, setAllNotes] = useState<Task[]>([]);
  const [isGrid, setIsGrid] = useAtom(isContainerGrid);
  const [selectedId, setSelectedId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data, isLoading, isFetching, isError, isSuccess } = useAllTasks();
  const deleteTask = useDeleteTask();
  const router = useRouter();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (isError) return <p>Error loading tasks</p>;

  const handleDelete = async () => {
    if (!selectedId) return;

    deleteTask.mutate(selectedId, {
      onError: (err) => console.log("Error deleting task", err),
      onSuccess: () => setModalVisible(false),
    });
  };

  return (
    <View className="flex-1 px-1">
      <FlatList
        key={isGrid ? "grid" : "list"}
        data={data?.data || []}
        numColumns={isGrid ? 2 : 1}
        keyExtractor={(item) => item.documentId.toString()}
        renderItem={({ item, index }) => (
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              opacity: { type: "timing", duration: 300, delay: index * 60 },
              translateY: { type: "timing", duration: 300, delay: index * 60 },
            }}
            style={
              isGrid
                ? { flexBasis: "48%", maxWidth: "48%", minHeight: 90 }
                : { flex: 1 }
            }
            className="flex-1 flex-row justify-between"
          >
            <View
              className={`
         flex-1 flex-row justify-between p-3 ${isGrid ? "border m-1 rounded-xl bg-gray-200 elevation-sm" : "border-b"} border-gray-300
      `}
            >
              <TouchableOpacity
                className="flex-1"
                onPress={() => router.push(`/${item.documentId}/view-details`)}
              >
                <Text className="text-xl" numberOfLines={2}>
                  {item.title}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedId(item.documentId);
                  setModalVisible(true);
                }}
                z-10
                className={isGrid ? "absolute top-2 right-2 z-10" : ""}
              >
                <MaterialIcons name="delete-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </MotiView>
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
