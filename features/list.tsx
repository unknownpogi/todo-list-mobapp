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
import Animated, {
  FadeInDown,
  FadeOutLeft,
  LinearTransition,
} from "react-native-reanimated";

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

  if (isError) return <Text>Error loading tasks</Text>;

  console.log(data?.data);

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
        contentContainerStyle={{
          paddingHorizontal: isGrid ? 4 : 0,
          paddingTop: 6,
        }}
        key={isGrid ? "grid" : "list"}
        data={data?.data || []}
        numColumns={isGrid ? 2 : 1}
        keyExtractor={(item) => item.documentId.toString()}
        renderItem={({ item, index }) => (
          <Animated.View
            layout={LinearTransition.springify()}
            entering={FadeInDown.delay(index * 60).duration(500)}
            exiting={FadeOutLeft.duration(250)}
            style={
              isGrid
                ? { flexBasis: "48%", maxWidth: "48%", minHeight: 90 }
                : { flex: 1 }
            }
          >
            <MotiView
              from={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                scale: {
                  type: "timing",
                  duration: 500,
                  delay: index * 60,
                },
              }}
              className="flex-1 flex-row justify-between"
            >
              <View
                className={`flex-1 flex-row justify-between p-3 ${
                  isGrid
                    ? "border m-1 rounded-xl bg-gray-200 elevation-sm"
                    : "border-b"
                } border-gray-300`}
              >
                <TouchableOpacity
                  className="flex-1"
                  onPress={() =>
                    router.push(`/${item.documentId}/view-details`)
                  }
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
                  className={isGrid ? "absolute top-2 right-2 z-10" : ""}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </MotiView>
          </Animated.View>
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
